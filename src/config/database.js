import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

// neon
const sequelize = new Sequelize({
  host: process.env.PGHOST,
  port: process.env.DB_PORT,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  dialect: 'postgres',
  logging: false,
})

// docker
// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialect: 'postgres',
//   protocol: 'postgres',
//   logging: false,
// })

// supabase
// const sequelize = new Sequelize({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   dialect: 'postgres',
//   logging: false,
// })

async function testConnection() {
  try {
    await sequelize.authenticate()
    console.log('Conexão com o banco estabelecida com sucesso!')
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err)
  }
}

await testConnection()

export default sequelize
