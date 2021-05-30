import {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLFieldConfig,
  GraphQLInputObjectType
} from 'graphql'

const DummyPayload = new GraphQLObjectType({
  name: 'DummyPayload',
  description: 'Dummy payload object',
  fields: {
    success: {
      description: 'some value return',
      type: GraphQLBoolean
    }
  }
})
const DummyInput = new GraphQLInputObjectType({
  name: 'DummyInput',
  description: 'Dummy Input object',
  fields: {
    param1: {
      description: 'Some input value',
      type: GraphQLBoolean
    }
  }
})

/**
 * DummyModule API GraphQL
 *
 * Ejemplo módulo con resolver.
 *
 */
export const DummyModule: GraphQLFieldConfig<any, any, any> = {
  type: DummyPayload,
  description: 'Módulo de pruebas implementación',
  deprecationReason: 'Sin uso real, recibe parametro y retorna el mismo valor.',
  args: {
    input: {
      type: DummyInput,
      description: 'Input params'
    }
  },
  resolve: (root, args, ctx, info) => {
    return {
      success: args.input.param1
    }
  }
}

export default DummyModule
