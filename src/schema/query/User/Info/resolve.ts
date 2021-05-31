import { GraphQLResolveInfo } from 'graphql'
import { Context } from '../../../types'

import { UserInfoArgs, UserInfoPayload } from './Type'

/**
 * Resolver del módulo.
 */
export default async (
  root: any,
  args: UserInfoArgs,
  ctx: Context,
  info: GraphQLResolveInfo
): Promise<UserInfoPayload> => {
  try {
    // ... your code here
    // dont forget remove await new Promise.resolve(
    return await Promise.resolve({
      status: true
    })
  } catch (err) {
    return Promise.resolve({
      status: false
    })
  }
}
