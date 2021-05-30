/**
 * Variables de entorno utilizadas.
 */
export interface Environment {
  /**
   * Opciones Apollo
   */
  apollo: {
    /** Si se puede o no activar la instrospección. */
    introspection: boolean
    /** Playground activado o no. */
    playground: boolean
  }
  /** Puerto por defecto donde se levanta la app. */
  port: number | string

  /** Nivel de log en app. */
  logLevel: string

  /**
   * Ambiente en que se está ejecutando la aplicación.
   */
  enviroment: string | 'development'

  /** URL conexión con Redis. */
  redis: string

  /**
   * Conexión con redis.
   *
   * - redis: ioredis
   * - other: ioredis-mock
   */
  cacheStore?: string
}
