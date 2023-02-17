#!/usr/bin/env node
import {format} from 'util'
import closeWithGrace from 'close-with-grace'
import {makeWebApp} from './todo-list-page-server.js'
import pino from 'pino'

const logger = pino()

const config = {}
const {app} = await makeWebApp(config)

const port = parseInt(process.env.PORT ?? '3000')
try {
  const baseUrl = await app.listen({port, host: '0.0.0.0'})

  logger.info({event: 'app-listening', baseUrl, port, config, success: true})
} catch (error) {
  logger.error({event: 'app-listening', port, config, success: false, error})
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
