import { GraphQLObjectType } from 'graphql/type'

/** Dummy Module. */
import Dummy from '../Dummy'

/**
 * Objeto consolidado con todas las mutaciones del sistema.
 */
export default new GraphQLObjectType({
  name: 'Mutation',
  description: 'Todas las mutaciones del sistema',
  fields: () => {
    return {
      Dummy
    }
  }
})
