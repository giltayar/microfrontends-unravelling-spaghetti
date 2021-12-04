import fastify from 'fastify'
import {healthz} from './controllers/healthz-controller.js'
import proxy from 'fastify-http-proxy'

/** @param {{}} options */
export async function makeWebApp({}) {
  const app = fastify()

  app.get('/healthz', healthz)
  app.get('/', async (_req, reply) => reply.redirect('/todo/'))

  app.register(proxy, {
    upstream: 'http://about-page-server/',
    prefix: '/about/',
    rewritePrefix: '/',
  })
  app.register(proxy, {
    upstream: 'http://todo-list-page-server/',
    prefix: '/todo/',
    rewritePrefix: '/',
  })

  return {app}
}
