import {describe, it, before, after} from '@roundforest/mocha-commons'
import path from 'path'
import {expect} from 'chai'
import {automateBrowserWithWebdriverIO} from '@roundforest/webdriverio-testkit'
import {serveSiteViaRollup} from '@roundforest/rollup-testkit'

const __filename = new URL(import.meta.url).pathname
const __dirname = path.dirname(__filename)

describe('todo-list-page (e2e)', function () {
  const {baseUrl, teardown: rollupTeardown} = before(() =>
    serveSiteViaRollup(path.resolve(__dirname, 'fixtures/site-with-component')),
  )
  const {browser, teardown} = before(() =>
    automateBrowserWithWebdriverIO(baseUrl(), {browser: process.env.BROWSER}),
  )
  after(() => teardown()?.())
  after(() => rollupTeardown()?.())

  it('should work in a browser', async () => {
    const b = browser()

    await b.url('/index.html')

    const el = await b.$('span')

    expect(await el.getText()).to.equal('42')

    await (await b.$('#root button')).click()

    expect(await el.getText()).to.equal('41')
  })
})
