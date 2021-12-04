import path from 'path'
import {runDockerCompose} from '@roundforest/docker-compose-testkit'
import {after, before, describe, it} from '@roundforest/mocha-commons'
import retry from 'p-retry'
import {automateBrowserWithWebdriverIO} from '@roundforest/webdriverio-testkit'
import chaiSubset from 'chai-subset'
import {expect, use} from 'chai'
use(chaiSubset)

const __filename = new URL(import.meta.url).pathname
const __dirname = path.dirname(__filename)

describe('microfrontends-site (e2e)', function () {
  const {findAddress, teardown} = before(() =>
    runDockerCompose(path.resolve(__dirname, 'docker-compose.yaml'), {
      forceRecreate: !!process.env.FULL_TEST,
      containerCleanup: !!process.env.FULL_TEST,
      variation: __filename,
      env: {
        npm_package_version: process.env.npm_package_version,
      },
    }),
  )

  const {baseUrl} = before(async () => {
    const appAddress = await findAddress()('app', 80)

    return {baseUrl: `http://${appAddress}/`}
  })
  const {browser, teardown: teardownBrowser} = before(() =>
    automateBrowserWithWebdriverIO(baseUrl(), {browser: process.env.BROWSER}),
  )

  after(() => teardownBrowser()?.())
  after(() => teardown()())

  it('"/todo/" should work', async () => {
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

  it('"/about/" should work', async () => {
    const b = browser()

    await b.url('/about/')

    expect(await (await b.$('h1')).getText()).to.equal('About Microfrontends')
  })
})
