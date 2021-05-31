import { Args } from '../../../../types'

/**
 * Definición de inputs
 */
export interface UserInfoInput {
  sample: number
}

export interface UserInfoPayload {
  /** Estado request. */
  status: boolean
}
/**
 * Argumentos del resolver.
 */
export type UserInfoArgs = Args<UserInfoInput>
