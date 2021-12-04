import fastify from 'fastify'
import proxy from 'fastify-http-proxy'

/** @param {{}} options */
export async function makeWebApp({}) {
  const app = fastify()

  app.get('/healthz', async () => ({}))
  app.get('/', async (_req, reply) => reply.redirect('/todo/'))

  app.register(proxy, {
    prefix: '/about/',
    rewritePrefix: '/',
    upstream: 'http://about-page-server/',
  })
  app.register(proxy, {
    prefix: '/todo/',
    rewritePrefix: '/',
    upstream: 'http://todo-list-page-server/',
  })

  return {app}
}
