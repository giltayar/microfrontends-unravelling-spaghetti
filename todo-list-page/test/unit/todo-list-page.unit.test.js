import {describe, it, afterEach} from 'mocha'
import {expect, use} from 'chai'
import chaiDom from 'chai-dom'
import jsdomGlobal from 'jsdom-global'
import reactTestingLibrary from '@testing-library/react'
const {render, cleanup} = reactTestingLibrary
import {html} from 'htm/react/index.js'

jsdomGlobal(undefined, {pretendToBeVisual: true, url: 'https://example.com'})
use(chaiDom)

import {TodoListPage} from '../../src/todo-list-page.js'

describe('todo-list-page (unit)', function () {
  afterEach(cleanup)

  it('should start with 0', async () => {
    const {findByPlaceholderText} = render(html`<${TodoListPage} />`)

    expect((await findByPlaceholderText('What needs to be done?')).textContent).to.equal('')
  })
})
