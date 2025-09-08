import { email } from 'zod'
import { tutorSchema } from '../schemas/tutor.schemas'
import { randomUUID } from 'crypto'

//POST - /tutores
export const criarTutor = async (req, res) => {
  try {
    const data = tutorSchema.parse(req.body)
    const emailExistente = await Usuario.findOne({
      where: { email: data.email },
    })
    const telefoneExistente = await Usuario.findOne({
      where: { telefone: data.telefone },
    })
    const celularExistente = await Usuario.findOne({
      where: { celular: data.celular },
    })
    const instagramExistente = await Usuario.findOne({
      where: { instagram: data.instagram },
    })
    const facebookExistente = await Usuario.findOne({
      where: { facebook: data.facebook },
    })
    if (
      emailExistente |
      telefoneExistente |
      celularExistente |
      instagramExistente |
      facebookExistente
    ) {
      return res.status(400).json({
        erro: 'Todos os campos obrigatórios devem ser preenchidos corretamente.',
      })
    }
    const tutor = {
      id: randomUUID(),
      ...data,
      administrador: false,
    }
    const novoTutor = await Usuario.create(tutor)
    return res.status(201).json(novoTutor)
  } catch {
    return res.status(500).json({ erro: 'Erro interno ao cadastrar o animal.' })
  }
}

// GET - /tutores
export const listarTutor = async (rez, res) => {}
