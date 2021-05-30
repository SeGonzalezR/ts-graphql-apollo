'use strict'

import bodyParser from 'body-parser'
// import commentPlugin from 'sequelize-comment'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'

import logger from './config/logger'
import Sentry from './config/sentry'
// import models from './models'
// import passport from './passport'
// import router from './router'
import server from './apollo'

// models.sequelize.options.logging = logger.debug
// commentPlugin(models.sequelize)
// Promise.all([models.sequelize.authenticate()]).catch(err => {
//   throw err
// })

const app = express()

// Mejorar seguridad
app.use(helmet())
app.disable('x-powered-by')
app.set('trust proxy', 1)

app.use(morgan('combined'))

// Inicializa passport
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(
  bodyParser.json({
    limit: '20mb'
  })
)
// app.use(passport.initialize())
app.use(cors())

// Headers fijo para todos los requests
app.use((req, res, next) => {
  res.set('api-version', '1.0.0')
  next()
})

// Rutas
app.use(Sentry.Handlers.requestHandler())
app.use(express.static(path.join(__dirname, '..', 'public')))
// router(app)

// Apollo server
server.applyMiddleware({ app, path: '/graphql' })

// Error
app.use(Sentry.Handlers.errorHandler())
app.use((err: Error, req: any, res: any, next: any) => {
  logger.error(err)
  res.sendStatus(500)
})

if (module.hot) {
  module.hot.accept()
  module.hot.dispose(() => server.stop())
}

/** Exporta la aplicación */
export default app
