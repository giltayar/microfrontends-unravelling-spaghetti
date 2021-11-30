import fastify from 'fastify'
import makeLogger from '@roundforest/pino-global'
import fastifyHelmet from 'fastify-helmet'
import logRequestFastifyPlugin from '@roundforest/log-request-fastify-plugin'
import requestIdFastifyPlugin from '@roundforest/request-id-fastify-plugin'
import requestIdLoggerFastifyPlugin from '@roundforest/request-id-logger-fastify-plugin'
import {healthz} from './controllers/healthz-controller.js'
import {serveHtml} from './controllers/serve-html-controller.js'
import fastifyStatic from 'fastify-static'
import path from 'path'
import crypto from 'crypto'

const __dirname = new URL('.', import.meta.url).pathname

const logger = makeLogger({name: 'webapp'})

/**
 * @param {{
 * }} options
 */
export async function makeWebApp({}) {
  const app = fastify()

  app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      // these are the defaults from `helmet`
      directives: {
        defaultSrc: ["'self'"],
        baseUri: ["'self'"],
        blockAllMixedContent: [],
        fontSrc: ["'self'", 'https:', 'data:'],
        frameAncestors: ["'self'"],
        imgSrc: ["'self'", 'data:'],
        objectSrc: ["'none'"],
        scriptSrc: [
          "'self'",
          function (_request, reply) {
            const nonce = crypto.randomBytes(16).toString('hex')
            // @ts-expect-error
            reply.scriptNonce = nonce
            return `'nonce-${nonce}'`
          },
        ],
        scriptSrcAttr: ["'none'"],
        styleSrc: [
          "'self'",
          function (_request, reply) {
            const nonce = crypto.randomBytes(16).toString('hex')
            // @ts-expect-error
            reply.styleNonce = nonce
            return `'nonce-${nonce}'`
          },
        ],
      },
    },
  })
  app.register(logRequestFastifyPlugin, {logger})
  app.register(requestIdFastifyPlugin, {})
  app.register(requestIdLoggerFastifyPlugin, {logger})

  app.get('/healthz', healthz)
  app.get('/', function (request, reply) {
    return serveHtml(request, reply, {
      // @ts-expect-error
      script: reply.raw.scriptNonce,
      // @ts-expect-error
      style: reply.raw.styleNonce,
    })
  })
  app.register(fastifyStatic, {root: path.resolve(__dirname, '../dist'), prefix: '/dist/'})

  return {app}
}
