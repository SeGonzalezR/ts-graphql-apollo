# Typescript + GraphQL + Apollo Server

Este proyecto nace de la necesidad de tener un template para levantar API con GraphQL de manera rápida y modular.

La aplicación está usando webpack para compilar typescript a ES5
Por lo tanto hay 2 archivos principales que tienen ambientes de desarrollo para
- `dev`: desarrollo con HMR activado
- `production`: producción sin HMR

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
