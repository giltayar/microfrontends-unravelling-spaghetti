import ReactDOM from 'react-dom'
import {html} from 'htm/react/index.js'
import {TodoListPage} from 'microfrontends-unravelling-spaghetti-todo-list-page'

ReactDOM.hydrate(html`<${TodoListPage} data=${window.__DATA__} />`, document.querySelector('#root'))

delete window.__DATA__
