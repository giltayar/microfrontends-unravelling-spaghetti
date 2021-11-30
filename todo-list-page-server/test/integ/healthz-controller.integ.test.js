import {fetchAsJson} from '@roundforest/http-commons'
import {after, before, beforeEach, describe, it} from '@roundforest/mocha-commons'
import {initializeForTesting} from '@roundforest/pino-global'
import {loggerOptionsForRecorder, recordLogs} from '@roundforest/pino-testkit'
import {expect, use} from 'chai'
import chaiSubset from 'chai-subset'
import {makeWebApp} from '../../src/todo-list-page-server-server.js'
use(chaiSubset)

describe('healthz-controller (integ)', function () {
  before(() => initializeForTesting(loggerOptionsForRecorder))

  const {baseUrl, app} = before(async () => {
    const {app} = await makeWebApp({})

    return {
      baseUrl: await app.listen(0),
      app,
    }
  })

  beforeEach(recordLogs)

  after(async () => process.env.FULL_TEST && (await app()?.close()))

  it('should be healthy and have correct request logging', async () => {
    expect(await fetchAsJson(new URL('/healthz', baseUrl()))).to.eql({})
  })
})
