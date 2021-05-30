import { GraphQLObjectType } from 'graphql/type'

/** Dummy Module. */
import Dummy from '../Dummy'

/**
 * Objeto consolidado con todas las querys del sistema.
 */
export default new GraphQLObjectType({
  name: 'Query',
  description: 'Todas las querys del sistema',
  fields: () => {
    return {
      Dummy
    }
  }
})
