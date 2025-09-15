import { Tutor } from '../models/Modelos'
import { tutorSchema } from '../schemas/tutor.schemas'

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

    const novoTutor = await Tutor.create(data)
    return res.status(201).json(novoTutor)
  } catch {
    return res.status(500).json({ erro: 'Erro interno ao cadastrar o tutor.' })
  }
}

//GET - /tutores/:id
export const listarTutor = async (req, res) => {
  try {
    const tutorId = req.params
    const tutor = await Tutor.findOne({ where: tutorId })

    if (!tutor) {
      return res.status(404).json({ erro: 'Erro ' })
    }

    return res.status(200).json(tutor)
  } catch {
    return res.status(500).json({ erro: 'Erro interno ao listar tutor' })
  }
}

//PATCH - /tutores/:id - fazer questionario e finalizar
export const atualizarTutor = async (req, res) => {
  try {
    const tutorId = req.params

    const tutorPatch = req.body

    const novoTutor = await Tutor.update(tutorPatch, { where: tutorId })

    return res.status(200).json(novoTutor)

  } catch {
    return res.status(500).json({ erro: 'Erro interno ao atualizar tutor' })
  }
}
