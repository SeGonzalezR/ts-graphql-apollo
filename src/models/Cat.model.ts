import { Model, Table, Column, PrimaryKey } from 'sequelize-typescript'
import { Optional } from 'sequelize'

export interface CatAttributes {
  id: number
  name: string
}

interface CatCreationAttributes extends Optional<CatAttributes, 'id'> {}

@Table({
  tableName: 'cats',
  createdAt: 'created',
  updatedAt: 'modified'
})
export default class Cat extends Model<CatAttributes, CatCreationAttributes> {
  @Column({
    comment: 'Nombre del gatito'
  })
  name!: string
}
