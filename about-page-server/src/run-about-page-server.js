#!/usr/bin/env node
import {format} from 'util'
import makeLogger, {initializeLoggerOptions} from '@roundforest/pino-global'
import closeWithGrace from 'close-with-grace'
import {makeWebApp} from './about-page-server.js'

initializeLoggerOptions('about-page-server:')
const logger = makeLogger({name: 'run'})

const config = {}
const {app} = await makeWebApp(config)

const port = process.env.PORT ?? 3000
try {
  const baseUrl = await app.listen(port, '0.0.0.0')

  logger.info({event: 'app-listening', baseUrl, port, config, success: true})
} catch (error) {
  logger.error({event: 'app-listening', port, config, success: false})
}

closeWithGrace(
  {delay: 10000},
  /**@param {{err: any}} p*/ async ({err}) => {
    logger.error({
      event: 'app-listening',
      port,
      config,
      error: format(err),
    })
    await app.close()
  },
)
