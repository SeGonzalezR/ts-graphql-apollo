import { env } from './enviroments'
import Sentry from '@sentry/node'

/**
 * Configuración Sentry.
 */
if (typeof env.SentryConfig !== 'undefined') {
  Sentry.init({
    dsn: env.SentryConfig.SENTRY_DSN,
    release: env.SentryConfig.SENTRY_RELEASE || 'package-release',
    serverName: env.SentryConfig.SENTRY_NAME,
    environment: env.SentryConfig.SENTRY_ENVIRONMENT || env.enviroment
  })
}

export default Sentry
