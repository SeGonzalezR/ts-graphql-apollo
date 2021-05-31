import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql/type'

/**
 * Lorem ipsum dolor sit amet
 *
 * fields:
 * - sample: number
 */
export default new GraphQLInputObjectType({
  name: 'UserInfoInput', // change this name, is unique in your app
  description: '',
  fields: {
    sample: {
      description: '',
      type: new GraphQLNonNull(GraphQLInt)
    }
  }
})
