// eslint-disable-next-line no-unused-vars
import React from 'react'
import ReactDOM from 'react-dom'
import {html} from 'htm/react/index.js'
import createCache from '@emotion/cache'
import {CacheProvider} from '@emotion/react'
import {TodoListPageServer} from './todo-list-page-server.js'

const cache = createCache({key: 'todo-list-page-server', nonce: window.__NONCE__})

ReactDOM.hydrate(
  html`
    <${CacheProvider} value=${cache}>
      <${TodoListPageServer} data=${window.__DATA__} />
    <//>
  `,
  document.querySelector('#root'),
)

delete window.__DATA__
delete window.__NONCE__
