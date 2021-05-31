import { Options as SequelizeOptions } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'

import Cat from './Cat.model'

const logging = console.log // eslint-disable-line no-console

/**
 * Conexión sequelize
 */
const defaultOptions: SequelizeOptions = {
  dialect: 'mysql',
  // operatorsAliases: false,
  // dialectOptions: {
  //   timezone: 'local'
  // },
  logging: process.env.SEQUELIZE_DEBUG === 'true' ? logging : false,
  // operatorsAliases: false,
  benchmark: process.env.SEQUELIZE_DEBUG === 'true',
  pool: {
    max: Number(process.env.SEQUELIZE_POOL_MAX || '5'),
    min: Number(process.env.SEQUELIZE_POOL_MIN || '0'),
    idle: Number(process.env.SEQUELIZE_POOL_IDLE || '10000'),
    acquire: Number(process.env.SEQUELIZE_POOL_ACQUIRE || '60000'),
    evict: Number(process.env.SEQUELIZE_POOL_EVICT || '1000')
  },
  timezone: process.env.TZ || '+00:00',
  dialectOptions: {
    timezone: 'local'
  }
}

/** Instancia de sequelize */
const sequelize = new Sequelize({
  database: 'samples',
  dialect: 'mysql',
  username: 'root',
  password: 'root',
  ...defaultOptions,
  models: [Cat]
})
// sequelize.addModels([__dirname + '/*.model.ts'])
export default sequelize
export const models = {
  Cat
}
