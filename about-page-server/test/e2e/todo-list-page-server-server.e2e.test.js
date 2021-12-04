import path from 'path'
import {runDockerCompose} from '@roundforest/docker-compose-testkit'
import {after, before, describe, it} from '@roundforest/mocha-commons'
import {fetchAsJson, fetchAsText} from '@roundforest/http-commons'
import chaiSubset from 'chai-subset'
import {expect, use} from 'chai'
use(chaiSubset)

const __filename = new URL(import.meta.url).pathname
const __dirname = path.dirname(__filename)

describe('about-page-server (e2e)', function () {
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

  after(() => teardown()())

  it('should be healthy', async () => {
    expect(await fetchAsJson(new URL('/healthz', baseUrl()))).to.eql({})
  })

  it('should return todos', async () => {
    expect(await fetchAsText(new URL('/', baseUrl()))).to.include('About Microfrontends')
  })
})
