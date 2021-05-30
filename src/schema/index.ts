import {
  MutationValidationErrorType,
  FieldValidationErrorType
} from 'graphql-yup-middleware'

import { GraphQLSchema } from 'graphql/type'

import mutation from './mutation'
import query from './query'

export default new GraphQLSchema({
  query,
  mutation,
  types: [MutationValidationErrorType, FieldValidationErrorType]
})
