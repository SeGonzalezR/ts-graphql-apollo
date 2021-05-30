import depthLimit from 'graphql-depth-limit'
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
import { env } from './enviroments'
import redis from './redis'
import { schema } from '../schema'
const redisUri = new ConnectionString(env.redis)

const middlewares: any = []
const options: ApolloServerExpressConfig = {
  context: ({ req }) => ({
    req,
    redis
    // [EXPECTED_OPTIONS_KEY]: createContext({})
  }),
  validationRules: [
    depthLimit(Number(process.env.GRAPHQL_DEPTH_LIMIT || '10'))
  ],
  formatError: err => {
    delete err.extensions?.exception
    if (
      !(err.originalError instanceof ApolloError) &&
      err.originalError &&
      process.env.NODE_ENV === 'production'
    ) {
      err.message = 'Internal server error'
    }
    return new ApolloError(err.message, err.extensions?.code, err.extensions)
  },
  plugins: [
    responseCachePlugin({
      sessionId: (req: any) => {
        return req.context?.req?.user?.id || null
      }
    })
  ],
  schema: applyMiddleware(schema, ...middlewares)
}

if (process.env.NODE_ENV === 'production') {
  options.playground = false
  options.tracing = true
  options.introspection = env.apollo.introspection
}
if (
  process.env.NODE_ENV === 'production' ||
  process.env.CACHE_STORE === 'redis'
) {
  options.cache = new RedisCache({
    host: redisUri.host,
    port: redisUri.port || 6379
  })
}

const server = new ApolloServer(options)
export default server

// const schemaWithMiddleware = applyMiddleware(schema, logInput)
// const apollo = new ApolloServer({
//   resolvers,
//   typeDefs,
// })
