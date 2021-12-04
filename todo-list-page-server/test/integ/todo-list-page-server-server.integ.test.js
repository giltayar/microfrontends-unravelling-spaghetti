import path from 'path'
import {expect} from 'chai'
import {describe, it, before, after} from '@roundforest/mocha-commons'
import {automateBrowserWithWebdriverIO} from '@roundforest/webdriverio-testkit'
import retry from 'p-retry'
import {makeWebApp} from '../../src/todo-list-page-server.js'

const __filename = new URL(import.meta.url).pathname
const __dirname = path.dirname(__filename)

describe('todo-list-page-server (integ)', function () {
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
    expect(await (await b.$('.App-header')).getText()).to.equal('todos')

    await retry(
      async () => {
        await (await b.$('.new-todo')).setValue('wash dishes\n')

        expect(await (await b.$('.todo .todo-text')).getText()).to.equal('wash dishes')
      },
      {
        retries: 3,
        minTimeout: 1000,
        maxTimeout: 1000,
      },
    )
  })
})
