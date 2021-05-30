import depthLimit from 'graphql-depth-limit'
import ms from 'ms'
import responseCachePlugin from 'apollo-server-plugin-response-cache'
import {
  ApolloError,
  ApolloServer,
  ApolloServerExpressConfig
} from 'apollo-server-express'
import { ConnectionString } from 'connection-string'
import { RedisCache } from 'apollo-server-cache-redis'
import { applyMiddleware } from 'graphql-middleware'
// import { createContext, EXPECTED_OPTIONS_KEY } from 'dataloader-sequelize'

// Local deps
import { env } from './config/enviroments'
import redis from './config/redis'
import { schema } from './schema'
const redisUri = new ConnectionString(env.redis)

const middlewares: any = []

/**
 * Configuraciones ApolloServer
 * - context
 * - validationRules
 * - formatError
 * - plugins
 * - schema
 * - tracing
 * - playground
 * - instrospection
 * - cache
 */
const options: ApolloServerExpressConfig = {
  context: ({ req }) => ({
    req,
    redis
    // [EXPECTED_OPTIONS_KEY]: createContext({})
  }),
  validationRules: [
    depthLimit(Number(env.GraphQL.DepthLimit || '10'))
  ],
  /**
   * Formatea errores en la respuesta.
   */
  formatError: err => {
    delete err.extensions?.exception
    if (
      !(err.originalError instanceof ApolloError) &&
      err.originalError &&
      env.enviroment === 'production'
    ) {
      err.message = 'Internal server error'
    }
    return new ApolloError(err.message, err.extensions?.code, err.extensions)
  },
  /** Caché por defecto máximo */
  cacheControl: { defaultMaxAge: ms('15m') },
  /** Pluggins cargados. */
  plugins: [
    responseCachePlugin({
      sessionId: (req: any) => {
        return req.context?.req?.user?.id || null
      }
    })
  ],
  /**
   * Schema con las definiciones Query/Mutaciones
   */
  schema: applyMiddleware(schema, ...middlewares)
}

if (env.enviroment === 'production') {
  options.playground = false
  options.tracing = true
  options.introspection = env.apollo.introspection
}
if (
  env.enviroment === 'production' ||
  process.env.CACHE_STORE === 'redis'
) {
  options.cache = new RedisCache({
    host: redisUri.host,
    port: redisUri.port || 6379
  })
}

const server = new ApolloServer(options)
export default server
