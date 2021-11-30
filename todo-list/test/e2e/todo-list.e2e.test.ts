import path from 'path'
import {describe, it, before, after} from '@roundforest/mocha-commons'
import {automateBrowserWithWebdriverIO} from '@roundforest/webdriverio-testkit'
import {automateGridEyesWithWebdriverIO} from '@roundforest/applitools-eyes-testkit'
import {serveSiteViaRollup} from '@roundforest/rollup-testkit'
import {Target} from '@applitools/eyes-webdriverio'

const __filename = new URL(import.meta.url).pathname
const __dirname = path.dirname(__filename)

describe('todo-list (e2e)', function () {
  const {baseUrl, teardown: rollupTeardown} = before(() =>
    serveSiteViaRollup(path.resolve(__dirname, 'fixtures/site-with-component'), {
      rollupConfigFile: path.resolve(__dirname, 'fixtures/site-with-component/rollup.config.mjs'),
    }),
  )

  const {browser, teardown} = before(() =>
    automateBrowserWithWebdriverIO(baseUrl(), {browser: process.env.BROWSER}),
  )

  const {eyes, finish} = before(() => automateGridEyesWithWebdriverIO('TodoList'))

  after(async () => finish()?.())
  after(() => teardown()?.())
  after(() => rollupTeardown()?.())

  it('should work in a browser', async () => {
    const b = browser()
    const e = eyes()

    await e.open(b, {testName: 'Grid test'})
    await b.url('/index.html')

    // First checkpoint
    await e.check('Full Page', Target.window().fully())

    // Main menu check
    const menu = await b.$('[data-testid="app-bar-menu"]')
    await menu.click()
    await e.check('Main Menu', Target.window())

    // Consent and revealed footer check
    const consent = await b.$('[data-testid="accept-cookies-button"]')
    await consent.click()
    await e.check(
      'Bottom Bar no Cookie Consent',
      Target.window().region('[data-testid="app-footer"]'),
    )

    e.close(true)
  })
})
