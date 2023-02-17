#!/usr/bin/env node
import {format} from 'util'
import closeWithGrace from 'close-with-grace'
import {makeWebApp} from './microfrontends-site.js'
import pino from 'pino'

const logger = pino()

const {app} = await makeWebApp()

const port = parseInt(process.env.PORT || '3000')
try {
  const baseUrl = await app.listen({port, host: '0.0.0.0'})

  logger.info({event: 'app-listening', baseUrl, port})
} catch (/** @type {any} */ error) {
  logger.error({event: 'app-listening', port, error})
}

closeWithGrace(
  {delay: 10000},
  /** @param {{err: any}} p */ async ({err}) => {
    logger.error({
      event: 'server-closing',
      port,
      error: format(err),
    })
    await app.close()
  },
)
