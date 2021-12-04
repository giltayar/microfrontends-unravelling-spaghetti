import path from 'path'
import {expect} from 'chai'
import {describe, it, before, after} from '@roundforest/mocha-commons'
import {automateBrowserWithWebdriverIO} from '@roundforest/webdriverio-testkit'
import {makeWebApp} from '../../src/about-page-server.js'

const __filename = new URL(import.meta.url).pathname
const __dirname = path.dirname(__filename)

describe('about-page-server (integ)', function () {
  const {baseUrl, app} = before(async () => {
    const {app} = await makeWebApp({})

    return {
      baseUrl: await app.listen(0),
      app,
    }
  })
  after(async () => process.env.FULL_TEST && (await app()?.close()))

  const {browser, teardown} = before(() =>
    automateBrowserWithWebdriverIO(baseUrl(), {browser: process.env.BROWSER}),
  )
  after(() => teardown()?.())

  it('should work in a browser', async () => {
    const b = browser()

    await b.url('/')
    expect(await (await b.$('h1')).getText()).to.equal('About Microfrontends')
  })
})
