#!/usr/bin/env node
import {format} from 'util'
import {
  makeLogger,
  getAsyncLocalStorageData,
  initializeLoggerOptions,
} from '@roundforest/pino-global'
import {setGlobalRequestIdGetter} from '@roundforest/http-commons'
import closeWithGrace from 'close-with-grace'
import {makeWebApp} from './microfrontends-site.js'

initializeLoggerOptions('microfrontends-site:')
const logger = makeLogger({name: 'run'})

const requestIdAsyncLocalStorageKey = 'http-commons:request-id'
setGlobalRequestIdGetter(() => getAsyncLocalStorageData(requestIdAsyncLocalStorageKey))

const config = {requestIdAsyncLocalStorageKey}
const {app} = await makeWebApp(config)

const port = process.env.PORT || 3000
try {
  const baseUrl = await app.listen(port, '0.0.0.0')

  logger.info({event: 'app-listening', baseUrl, port, config})
} catch (/** @type {any} */ error) {
  logger.error({event: 'app-listening', port, config})
}

closeWithGrace(
  {delay: 10000},
  /** @param {{err: any}} p */ async ({err}) => {
    logger.error({
      event: 'server-closing',
      port,
      config,
      error: format(err),
    })
    await app.close()
  },
)
