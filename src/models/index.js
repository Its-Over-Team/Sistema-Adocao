import { Sequelize } from 'sequelize'
import AnimalModel from './Animal.js'

const sequelize = new Sequelize('nome_do_banco', 'usuario', 'senha', {
  host: 'localhost',
  dialect: 'mysql',
})

export const Animal = AnimalModel(sequelize)

export default sequelize