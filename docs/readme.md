# Typescript + GraphQL + Apollo Server

Este proyecto nace de la necesidad de tener un template para levantar API con GraphQL de manera rápida y modular.

La aplicación está usando webpack para compilar typescript a ES5
Por lo tanto hay 2 archivos principales que tienen ambientes de desarrollo para

- `webpack.dev.js`: desarrollo con HMR activado
- `webpack.production.js`: producción sin HMR

# Características soportadas

Esta es una lista de presets que tiene configurado el repositorio en base a diferentes variables de entorno configuradas en el archivo
[./src/config/enviroments.ts](/src/config/enviroments.ts)

## Herramientas en producción

- [x] GraphQL 15.5x
- [ ] sequelize 6.0x
- [ ] Traducciones (i18n)
- [x] Sistema caché (redis)
- [ ] Sistema de colas (bull)
- [x] Reportería de errores (sentry)

## Herramientas de desarrollo

- [ ] Versionamiento semántico (semantic-release)
- [x] Test unitarios (mocha) `npm run test`
- [x] Linters `npm run lint`

# Compilar aplicación

```shell
  // desarrollo
  NODE_ENV=dev npm run build
  // o en producción
  NODE_ENV=production npm run build
```

# Iniciar la aplicación

```shell
npm start
```

al iniciar la aplicación se leerán las configuraciones del ambiente en `.env`

```
# Puerto donde se levantará el servidor, por defecto 4000
PORT=4000
// Si se puede usar la instrospección de GraphQL
APOLLO_INTROSPECTION=true
// Si tiene activado el playground en el servidor
APOLLO_PLAYGROUND=true
```

# Aplicación iniciada

```shell
> ts-graphql-apollo: npm start
> ts-graphql-apollo@latest start ts-graphql-apollo
> node --require dotenv/config dist/server

info: Listen in localhost:4000

```

## Rutas disponibles

- `/graphql`: Peticiones API
- `/admin/queues`: Administrador de colas `bull`
