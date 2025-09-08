import { Tutor } from '../models/Modelos'
import { tutorSchema } from '../schemas/tutor.schemas'
import { randomUUID } from 'crypto'

//POST - /tutores
export const criarTutor = async (req, res) => {
  try {
    const data = tutorSchema.parse(req.body)
    const emailExistente = await Tutor.findOne({
      where: { email: data.email },
    })
    const telefoneExistente = await Tutor.findOne({
      where: { telefone: data.telefone },
    })
    const celularExistente = await Tutor.findOne({
      where: { celular: data.celular },
    })
    const instagramExistente = await Tutor.findOne({
      where: { instagram: data.instagram },
    })
    const facebookExistente = await Tutor.findOne({
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
    const novoTutor = await Tutor.create(tutor)
    return res.status(201).json(novoTutor)
  } catch {
    return res.status(500).json({ erro: 'Erro interno ao cadastrar o animal.' })
  }
}
