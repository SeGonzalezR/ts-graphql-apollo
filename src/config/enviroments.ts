import { Environment } from './types'

/**
 * Variables de entorno seteadas en la aplicación.
 */
export const env: Environment = {
  apollo: {
    introspection: process.env.APOLLO_INTROSPECTION === 'true',
    playground: process.env.APOLLO_PLAYGROUND === 'true'
  },
  port: process.env.PORT || 4000,
  logLevel: process.env.LOG_LEVEL || 'info',
  enviroment: process.env.NODE_ENV || 'dev',
  redis: process.env.REDIS_URI || 'redis://localhost',
  cacheStore: process.env.CACHE_STORE,
  numCPUs: Number(process.env.MAX_CPU) || require('os').cpus().length,
  signal: process.env.HEALTHCHECK_SIGNAL || 'SIGINT',
  SentryConfig:
    process.env.SENTRY === 'ON'
      ? {
          SENTRY_DSN: process.env.SENTRY_DSN,
          SENTRY_ENVIRONMENT: process.env.SENTRY_ENVIRONMENT,
          SENTRY_NAME: process.env.SENTRY_NAME,
          SENTRY_RELEASE: process.env.SENTRY_RELEASE
        }
      : undefined,

  // ...
  GraphQL: {
    DepthLimit: Number(process.env.GRAPHQL_DEPTH_LIMIT || '10')
  }
}
