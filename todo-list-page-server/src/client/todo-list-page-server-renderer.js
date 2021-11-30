// eslint-disable-next-line no-unused-vars
import React from 'react'
import {renderToString} from 'react-dom/server.js'
import {html} from 'htm/react/index.js'
import {CacheProvider} from '@emotion/react'
import {renderStylesToString} from '@emotion/server'
import CacheModule from '@emotion/cache'
import {fromFauxModule} from '@roundforest/frontend-commons'
const createCache = fromFauxModule(CacheModule)
import {TodoListPageServer} from './todo-list-page-server.js'

/**
 * @param {{data: any, nonce: import('../controllers/serve-html-controller.js').CSPNonce}} props
 * @returns {string}
 */
export function renderPage({data, nonce}) {
  const cache = createCache({key: 'todo-list-page-server', nonce: nonce.style})

  return renderStylesToString(
    renderToString(html`<${CacheProvider} value=${cache}><${TodoListPageServer} data=${data} /><//>`),
  )
}
