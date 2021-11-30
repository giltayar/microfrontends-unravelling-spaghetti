import {promises as fs} from 'fs'
import path from 'path'
import {renderPage} from '../../dist/todo-list-page-server-renderer.js'
import {fetchData} from '../client/todo-list-page-server-fetcher.js'

const __dirname = new URL('.', import.meta.url).pathname

const indexHtmlTemplate = await fs.readFile(
  path.join(__dirname, '../public/index.template.html'),
  'utf8',
)

/**
 * A number, or a string containing a number.
 * @typedef {{script: string, style: string}} CSPNonce
 */

/**
 * @param {import('fastify').FastifyRequest} request
 * @param {import('fastify').FastifyReply} reply
 * @param {CSPNonce} nonce
 */
export async function serveHtml(request, reply, nonce) {
  const data = await fetchData(request, reply)
  const content = renderPage({data, nonce})

  reply.type('text/html')
  return indexHtmlTemplate
    .replace('${style_nonce}', nonce.style)
    .replace('${script_nonce}', nonce.script)
    .replace('${data}', JSON.stringify(data))
    .replace('${content}', content)
}
