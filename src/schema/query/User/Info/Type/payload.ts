import { GraphQLObjectType, GraphQLNonNull, GraphQLBoolean } from 'graphql/type'

/**
 * Objeto de retorno del módulo.
 */
export default new GraphQLObjectType({
  name: 'UserInfoPayload', // change this name, is unique in your app
  description: '',
  fields: {
    status: {
      description: '',
      type: new GraphQLNonNull(GraphQLBoolean)
    }
  }
})
