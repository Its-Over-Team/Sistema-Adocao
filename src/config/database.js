import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('postgresql', 'docker', 'docker', {
  host: 'localhost',
  dialect: 'postgres',
})

export default sequelize