import { Request } from 'express'
import { Redis } from 'ioredis'
import { CatAttributes } from '../models/Cat.model'

/**
 * Parámetros de entrada para los resolvers.
 */
export interface Args<TInputArgs> {
  input: TInputArgs
}

export interface Passport {
  isAuthenticated(): boolean
}
/**
 * Custom Request.
 */
export interface CustomRequest extends Request {
  user?: CatAttributes
}

/**
 * Contexto de las peticiones que llegan a todos los resolvers
 */
export interface Context {
  req: CustomRequest
  queues?: Queues
  redis?: Redis
}
