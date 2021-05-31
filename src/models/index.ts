import * as fs from 'fs'
import * as path from 'path'
import { Options as SequelizeOptions } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'

/**
 * Clase para inicializar los modelos.
 */
class Models {
  config = {
    database: '',
    username: '',
    password: ''
  }
  options: SequelizeOptions = {}
  sequelize: Sequelize
  models = {}
  modelNames: string[] = []

  /**
   * Constructor
   */
  constructor (
    database = 'test',
    username = 'root',
    password = 'root',
    options: SequelizeOptions = {}
  ) {
    this.config = {
      database,
      username,
      password
    }
    const defaultOptions: SequelizeOptions = {
      dialect: 'mysql',
      logging: false,
      // operatorsAliases: false,
      dialectOptions: {
        timezone: 'local'
      }
    }
    this.options = { ...defaultOptions, ...options }
    this.sequelize = new Sequelize(
      {
        database: this.config.database,
        dialect: 'mysql',
        username: this.config.username,
        password: this.config.password,
        // storage: ':memory:',
        models: [path.join(__dirname, '/../models/**/*.model.ts')]
      }
      // this.config.database,
      // this.config.username,
      // this.config.password,
      // this.options
    )
    console.log(this.sequelize)
    // this.Sequelize = Sequelize

    this.loadModels()
  }

  loadModels () {
    const filename = module.filename
    this.models = fs
      .readdirSync(__dirname)
      .filter(file => {
        console.log({ file: file })
        return (
          file.indexOf('.') !== 0 &&
          file !== path.basename(filename) &&
          file.slice(-8) !== '.test.js' &&
          file.slice(-3) === '.ts'
        )
      })
      .reduce((acc, file) => {
        console.log('file:', file)
        const model = require(path.join(__dirname, file))(this.sequelize)
        console.log('model:', model)
        return { ...acc, [model.name]: model }
      }, {})

    this.modelNames = []
    Object.entries(this.models).forEach(([modelName, model]) => {
      this.modelNames.push(modelName)
      // @ts-ignore
      if (model.associate) {
        // @ts-ignore
        model.associate(this.models)
      }
    })
  }
}

const db = new Models('samples', 'root', 'root')

export default db
