import {html} from 'htm/react/index.js'

export const Links = () => {
  return html`<div className="Links">
    <div className="double-click-help">Double click to edit a todo.</div>
    <div>Created by <a href="https://github.com/avsssai">Siva Addanki</a></div>
    <div className="desc">
      <span>A React implementation of todoMVC.</span>
      <span>
        | <a className="github" href="https://github.com/avsssai/todoMVC">github repo</a>
      </span>
      <span> | <a href="/about/">about</a> </span>
    </div>
  </div>`
}
