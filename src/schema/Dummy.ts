import {
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType,
  GraphQLFieldConfig,
  GraphQLInputObjectType
} from 'graphql'

import { models } from '../models/db'

const DummyPayload = new GraphQLObjectType({
  name: 'DummyPayload',
  description: 'Dummy payload object',
  fields: {
    success: {
      description: 'Return some value',
      type: GraphQLString
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
  resolve: async (root, args, ctx, info) => {
    const { Cat } = models
    const gato = await Cat.findOne()
    return {
      success: gato?.name || 'empty'
    }
  }
}

export default DummyModule
