import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize({
  // host: process.env.DB_HOST,
  // port: process.env.DB_PORT,
  // username: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  host: 'db.buejpgkszqycqrdlhefm.supabase.co',
  port: 5432,
  username: 'postgres',
  password: 'yVl5ODldhAnNWd8Z',
  database: 'postgres',
  dialect: 'postgres',
  logging: false,
})

console.log(sequelize)

try {
  await sequelize.authenticate()
  console.log(' Conexão estabelecida com sucesso!')
} catch (error) {
  console.error(' Erro ao conectar:', error)
}

export default sequelize
