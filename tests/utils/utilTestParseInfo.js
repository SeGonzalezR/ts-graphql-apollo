const util = require('util')

/**
 * Recibe un listado de valores para ordenar y devolver un request.
 *
 * @param {Map<Array>} info - Map con la información del request a ordenar.
 * @param {boolean} [log] - Imprime en consola el resultado.
 * @example
 *  const parsedInfo = parseInfo(info)
 * @returns {Object} Objeto con la información parseada.
 */
module.exports = (info, log) => {
  const selections = []
  info.forEach((elements, value) => {
    selections.push({
      name: { value },
      selectionSet: {
        selections: elements.map(element => {
          if (typeof element === 'object') {
            return {
              name: { value: element.keys().next().value },
              selectionSet: {
                selections: Array.from(
                  element.values().next().value,
                  subelement => {
                    return { name: { value: subelement } }
                  }
                )
              }
            }
          }
          return {
            name: { value: element }
          }
        })
      }
    })
  })

  const parsedInfo = {
    fieldNodes: [
      {
        selectionSet: {
          selections
        }
      }
    ]
  }

  /**
   * Imprime en cascada el objeto si no es en producción.
   */
  if (log && process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log(util.inspect(parsedInfo, false, null, true))
  }

  return parsedInfo
}
