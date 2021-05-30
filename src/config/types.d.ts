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

  /** Número máximo de CPU utilizadas al levantar la app. */
  numCPUs: number

  signal: string

  /**
   * Configuración Sentry.
   * - SENTRY_DSN: The Dsn used to connect to Sentry and identify the project. If omitted, the SDK will not send any data to Sentry.
   * - SENTRY_RELEASE: The release identifier used when uploading respective source maps. Specify this value to allow Sentry to resolve the correct source maps when processing events.
   * - SENTRY_NAME: Sets an optional server name (device name)
   * - SENTRY_ENVIRONMENT: The current environment of your application (e.g. "production").
   */
  SentryConfig?: {
    SENTRY_DSN?: string
    SENTRY_RELEASE?: string
    SENTRY_NAME?: string
    SENTRY_ENVIRONMENT?: string
  }

  /**
   * Configuraciones propias de GraphQL
   */
  GraphQL: {
    /** Profundidad máxima de herencias para consultar. */
    DepthLimit: number
  }
}
