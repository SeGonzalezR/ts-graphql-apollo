'use strict'

import cluster from 'cluster'
import http from 'http'
import { createTerminus, TerminusOptions } from '@godaddy/terminus'

import * as Terminus from './terminus'
import app from './app'
import logger from './config/logger'
import { env } from './config/enviroments'

/**
 * Levanta la Aplicación
 *
 * @example listenApp()
 */
const listenApp = () => {
  const server = http.createServer(app)
  const options: TerminusOptions = {
    healthChecks: { '/healthcheck': Terminus.onHealthCheck },
    timeout: 1000,
    signal: env.signal,
    onSignal: Terminus.onSignal,
    onShutdown: Terminus.onShutdown
  }

  createTerminus(server, options)
  server.listen(env.port)
  // eslint-disable-next-line no-console
  logger.info(`Listen in localhost:${env.port}`)
}

/**
 * En ambiente productivo levantamos varios clusters segun la cantidad de CPU definidas
 * Sino, solo levantamos solo un proceso.
 *
 * @see src/config/enviroments.ts
 */
if (env.enviroment === 'production') {
  if (cluster.isMaster) {
    // Fork workers.
    for (let i = 0; i < env.numCPUs; i++) {
      cluster.fork()
    }

    // on exit of cluster
    cluster.on('exit', (worker, code, signal) => {
      if (signal) {
        // eslint-disable-next-line no-console
        console.log(`worker was killed by signal: ${signal}`)
      } else if (code !== 0) {
        // eslint-disable-next-line no-console
        console.log(`worker exited with error code: ${code}`)
      } else {
        // eslint-disable-next-line no-console
        console.log('worker success!')
      }
      cluster.fork()
    })
  } else {
    listenApp()
  }
} else {
  listenApp()
}
