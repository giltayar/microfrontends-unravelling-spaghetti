import ReactDOM from 'react-dom'
import {html} from 'htm/react/index.js'
import {AboutPage} from 'microfrontends-unravelling-spaghetti-about-page'

ReactDOM.hydrate(html`<${AboutPage} data=${window.__DATA__} />`, document.querySelector('#root'))

delete window.__DATA__
