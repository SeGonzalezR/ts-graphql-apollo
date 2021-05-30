import {
  MutationValidationErrorType,
  FieldValidationErrorType
} from 'graphql-yup-middleware'

import { GraphQLObjectType, GraphQLSchema, GraphQLBoolean } from 'graphql/type'

const sample = new GraphQLObjectType({
  name: 'SamplePayload',
  description: 'Sample',
  fields: {
    someValue: {
      description: 'Sample',
      type: GraphQLBoolean
    }
  }
})

const query = new GraphQLObjectType({
  name: 'Query',
  description: 'Lorem ipsum dolor sit amet',
  fields: () => {
    return {
      Sample: {
        type: sample,
        description: 'Sample',
        resolve: () => {
          return {
            someValue: false
          }
        }
      }
    }
  }
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Lorem ipsum dolor sit amet mutation',
  fields: () => {
    return {
      MutationSample: {
        type: sample,
        description: 'Sample',
        resolve: () => {
          return 'sample text mutation'
        }
      }
    }
  }
})

export const schema = new GraphQLSchema({
  query,
  mutation,
  types: [MutationValidationErrorType, FieldValidationErrorType]
})
