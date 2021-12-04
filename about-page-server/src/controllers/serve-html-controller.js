import {promises as fs} from 'fs'
import path from 'path'
import {renderToString} from 'react-dom/server.js'
import {html} from 'htm/react/index.js'
import {AboutPage} from 'microfrontends-unravelling-spaghetti-about-page'

const __dirname = new URL('.', import.meta.url).pathname

const indexHtmlTemplate = await fs.readFile(path.join(__dirname, '../../public/index.html'), 'utf8')

/**
 * A number, or a string containing a number.
 * @typedef {{script: string, style: string}} CSPNonce
 */

/**
 * @param {import('fastify').FastifyRequest} request
 * @param {import('fastify').FastifyReply} reply
 */
export async function serveHtml(request, reply) {
  const data = await fetchData(request, reply)
  const content = renderToString(html`<${AboutPage} data=${data} />`)

  reply.type('text/html')
  return indexHtmlTemplate.replace('${data}', JSON.stringify(data)).replace('${content}', content)
}

/**
 *
 * @param {import('fastify').FastifyRequest} _request
 * @param {import('fastify').FastifyReply} _reply
 * @returns any
 */
async function fetchData(_request, _reply) {
  return 'Test data'
}
