import { GraphQLFieldConfig } from 'graphql'

import Input from './Type/input'
import Payload from './Type/payload'
import resolve from './resolve'

/**
 * getUserInfo GraphQLFieldConfig
 */
export const DummyModule: GraphQLFieldConfig<any, any, any> = {
  type: Payload,
  description: 'Retorna la información de un usuario.',
  args: {
    input: {
      type: Input,
      description: 'Parámetros opcionales de la query'
    }
  },
  resolve
}

export default DummyModule
