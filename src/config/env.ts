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
  redis: process.env.REDIS_URI || 'redis://localhost'
}
