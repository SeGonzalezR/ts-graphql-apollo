const MockExpressRequest = require('mock-express-request')
const Redis = require('ioredis-mock')
const { User } = require('../../src/models')

/**
 * @typedef {import('../../src/schema/types').Context} Context
 */

/**
 * Monta un request con redis y hace el Build de un Usuario por defecto.
 *
 * @param {number} [id=1] - Id opcional que tendrá el registro.
 * @param {boolean} [queues=false] - Indica si se debe agregar las queues.
 * @example const ctx = utilContext(1)
 * @returns {Context} Contexto.
 */
module.exports = (id = 1, queues = false) => {
  // @ts-ignore
  const req = new MockExpressRequest({
    headers: { 'x-forwarded-for': ['0.0.0.0'] }
  })
  req.user = User.build({ id, personId: id })
  /** @type {Context} */
  const ctx = { req, redis: new Redis() }
  if (queues) {
    ctx.queues = {
      jobOptions: { attempts: 1, backoff: 500 },
      // @ts-ignore
      emailQueue: { add: () => true }
    }
  }

  return ctx
}
