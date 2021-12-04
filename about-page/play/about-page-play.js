
import React from 'react'
import ReactDOM from 'react-dom'
import htm from 'htm'
import {AboutPage} from '../src/about-page.js'

const html = htm.bind(React.createElement)

ReactDOM.render(html`<${AboutPage} initialValue=${42} />`, document.getElementById('root'))
