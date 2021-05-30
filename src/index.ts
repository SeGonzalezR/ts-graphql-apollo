'use strict'

import logger from './config/logger'
import app from './app'
import * as Terminus from './terminus'

import cluster from 'cluster'
import http from 'http'
import { createTerminus } from '@godaddy/terminus'

const numCPUs = Number(process.env.MAX_CPU) || require('os').cpus().length

/**
 * Levanta la Aplicación
 *
 * @example listenApp()
 */
const listenApp = () => {
  const PORT = process.env.PORT || 3000
  const server = http.createServer(app)
  const options = {
    healthChecks: { '/healthcheck': Terminus.onHealthCheck },
    timeout: 1000,
    signal: process.env.HEALTHCHECK_SIGNAL || 'SIGINT',
    onSignal: Terminus.onSignal,
    onShutdown: Terminus.onShutdown,
    onHealthCheck: Terminus.onHealthCheck
  }

  createTerminus(server, options)
  server.listen(PORT)
  // eslint-disable-next-line no-console
  logger.info(`Listen in localhost:${PORT}`)
}

if (process.env.NODE_ENV === 'production') {
  if (cluster.isMaster) {
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
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
