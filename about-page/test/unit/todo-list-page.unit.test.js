import {describe, it, afterEach} from 'mocha'
import {expect, use} from 'chai'
import chaiDom from 'chai-dom'
import jsdomGlobal from 'jsdom-global'
import {render, cleanup} from '@testing-library/react'
import {html} from 'htm/react'

jsdomGlobal(undefined, {pretendToBeVisual: true, url: 'https://example.com'})
use(chaiDom)

import {AboutPage} from '../../src/about-page.js'

describe('about-page (unit)', function () {
  afterEach(cleanup)

  it('should start with 0', async () => {
    const {findByText} = render(html`<${AboutPage} />`)

    expect((await findByText('About Microfrontends')).tagName).to.equal('H1')
  })
})
