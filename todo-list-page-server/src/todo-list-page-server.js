import fastify from 'fastify'
import {serveHtml} from './controllers/serve-html-controller.js'
import fastifyStatic from 'fastify-static'
import path from 'path'

const __dirname = new URL('.', import.meta.url).pathname

/**
 * @param {{
 * }} options
 */
export async function makeWebApp({}) {
  const app = fastify()

  app.get('/', (request, reply) => serveHtml(request, reply))

  app.register(fastifyStatic, {
    root: path.resolve(__dirname, '../public'),
    prefix: '/',
    decorateReply: false,
  })

  app.register(fastifyStatic, {
    root: path.resolve(__dirname, '../node_modules'),
    prefix: '/node_modules/',
    decorateReply: false,
  })

  app.get('/healthz', async () => ({}))

  return {app}
}
