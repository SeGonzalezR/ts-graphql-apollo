const { describe, it } = require('mocha')
const { expect } = require('chai')

/**
 * @typedef {import('graphql').GraphQLInputObjectType} GraphQLInputObjectType
 * @typedef {import('graphql').GraphQLObjectType} GraphQLObjectType
 *
 * @typedef {Object} InputToTest
 * @property {*} field - Campo a evaluar.
 * @property {*} type - Tipo del Campo a Evaluar.
 */

/**
 * @param {GraphQLInputObjectType|GraphQLObjectType} Module - Fields de Input o Payload a testear (Objeto GraphQL).
 * @param {Array<InputToTest>} inputToTest - Campos a testear.
 * @param {string} moduleName - Nombre del objeto a evaluar.
 * @param {number} totalToTest - Total de campos a testear.
 * @example
 *  utilTestFields(Module, inputToTest, moduleName, totalToTest)
 * @returns {*} No retorna nada, solo evalúa, en caso de fallar se lanza la excepción del test.
 */
module.exports = (Module, inputToTest, moduleName, totalToTest) => {
  let testedFields = 0

  const Fields = Module.getFields()

  it(`Module should have a \`name\` equal to "${moduleName}"`, () => {
    expect(Module.name).to.equal(moduleName)
  })

  it('Module should have a `description` greater than 0 characters', () => {
    expect(Module.description.length).to.be.greaterThan(0)
  })

  it(`Module should have [${totalToTest}] fields!`, () => {
    expect(Object.keys(Fields).length).to.equal(totalToTest)
  })

  describe('fields', () => {
    for (const input of inputToTest) {
      describe(`${input.field.name}`, () => {
        it('Attribute must exist in Module.getFields()', () => {
          expect(Fields).to.have.property(input.field.name)
          testedFields++
        })
        it(`The type is equal to ${input.type.toString()}`, () => {
          expect(input.field.type).to.deep.equals(input.type)
          testedFields++
        })
        it('Description of at least 12 characters', () => {
          expect(input.field.description.trim().length).to.be.greaterThan(12)
          testedFields++
        })
      })
    }

    describe('[Total]', () => {
      it(`[${totalToTest}] fields were tested successfully!`, () => {
        expect(totalToTest).to.equal(Math.trunc(testedFields / 3))
      })
    })
  })
}
