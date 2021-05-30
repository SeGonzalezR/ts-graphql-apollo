import { ApolloServer } from 'apollo-server'

import { environment } from './environment'
import resolvers from './resolvers'
import typeDefs from './schemas'

const server = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: environment.apollo.introspection,
  playground: environment.apollo.playground
})

server
  .listen(environment.port)
  .then(({ url }) => {
    // eslint-disable-next-line no-console
    console.log(`Server ready at ${url}. `)
    return url
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.log({ err })
  })

if (module.hot) {
  module.hot.accept()
  module.hot.dispose(() => server.stop())
}
