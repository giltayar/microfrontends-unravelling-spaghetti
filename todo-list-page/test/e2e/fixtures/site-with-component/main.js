//@ts-nocheck
import React from 'react'
import ReactDOM from 'react-dom'
import htm from 'htm'
import {TodoListPage} from '../../../../src/todo-list-page.js'

const html = htm.bind(React.createElement)

ReactDOM.render(html`<${TodoListPage} initialValue=${42} />`, document.getElementById('root'))
