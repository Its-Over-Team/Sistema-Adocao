import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: 'postgres',
  logging: false,
})

try {
  await sequelize.authenticate()
  console.log(' Conexão estabelecida com sucesso!')
} catch (error) {
  console.error(' Erro ao conectar:', error)
}

export default sequelize
