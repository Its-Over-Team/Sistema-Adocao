import dotenv from 'dotenv'
import  Usuario  from '../models/Usuario.js'
import { criptografar } from '../lib/encrypt.js'
import sequelize from './database.js'

const Tutor = Usuario(sequelize)

dotenv.config()

async function seedAdmin() {
  try {
    await sequelize.sync({ force: false })

    const adminEmail = process.env.ADM_EMAIL

    const existe = await Tutor.findOne({ where: { email: adminEmail } })

    if (!existe) {
      const senhaCriptografada = criptografar(process.env.ADM_PASSWORD)

      await Tutor.create({
        nome_completo: 'Administrador do Sistema',
        email: adminEmail,
        senha: senhaCriptografada,
        cidade: 'Campinas',
        estado: 'SP',
        idade: 30,
        telefone: '19999999999',
        administrador: true,
      })

      console.log(' Usuário administrador criado com sucesso!')
    } else {
      console.log(' Usuário administrador já existe.')
    }

    process.exit(0)
  } catch (error) {
    console.error(' Erro ao criar usuário administrador:', error)
    process.exit(1)
  }
}

seedAdmin()
