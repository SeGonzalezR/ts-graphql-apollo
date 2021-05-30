// Cargar los modelos sequelize
// import models from './models'

/**
 * Metodo encargado ejecutar tareas previas a terminar la aplicación.
 * - Cierra todas las conexiones a sequelize.
 *
 * @example await onSignal()
 */
export const onSignal = async (): Promise<any> => {
  // eslint-disable-next-line no-console
  console.log(' > onSignal close connections')
  await Promise.resolve('OK')
  // await Promise.all([models.sequelize.close()])
}

/**
 * Metodo encargado de verificar que la aplicación este viva.
 *
 * @example await onHealthCheck()
 * @returns {Promise<any>} -
 */
export const onHealthCheck = async (): Promise<any> => {
  await Promise.resolve(' onHealthCheck ')
  // await Promise.all([models.sequelize.authenticate()])
}

/**
 * Método que se ejecuta cuando se da de baja el servidor.
 *
 * @example await onShutdown()
 * @returns {Promise<any>} -
 */
export const onShutdown = async (): Promise<any> => {
  // cleanup finished, server is shutting down
  await Promise.resolve(' Servidor apagándose ')
  // await Promise.all([models.sequelize.authenticate()])
}
