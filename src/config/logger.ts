import winston, { createLogger, transports, format } from 'winston'
import { hostname } from 'os'
import { env } from './env'
require('winston-syslog')

const logger = createLogger({
  level: env.logLevel,
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple())
    })
  ]
})

if (env.enviroment === 'production') {
  logger.add(
    // @ts-ignore
    new winston.transports.Syslog({
      host: process.env.PAPERTRAILAPP_HOST,
      port: process.env.PAPERTRAILAPP_PORT,
      appName: 'app-api',
      localhost:
        process.env.PAPERTRAILAPP_LOCALHOST ||
        process.env.SENTRY_NAME ||
        hostname()
    })
  )
}

logger.stream = {
  // @ts-ignore
  write: info => logger.info(info)
}

export default logger
