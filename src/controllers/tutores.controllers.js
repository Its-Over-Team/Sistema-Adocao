import { ZodError } from 'zod'
import { Tutor } from '../models/Modelos'
import { tutorSchema } from '../schemas/tutor.schemas'
import criptografar from '../lib/encrypt'

//POST /tutores
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

    if (emailExistente) {
      return res.status(400).json({
        erro: 'Email preenchido já está sendo utilizado.',
      })
    }

    if (
      telefoneExistente |
      celularExistente |
      instagramExistente |
      facebookExistente
    ) {
      return res.status(400).json({
        erro: 'Todos os campos obrigatórios devem ser preenchidos corretamente.',
      })
    }

    const senhaCriptografada = criptografar(data.senha)

    const novoTutor = {
      ...data,
      senha: senhaCriptografada
    }

    const tutor = await Tutor.create(novoTutor)
    return res.status(201).json(tutor)
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        erro: 'Todos os campos obrigatórios devem ser preenchidos corretamente.',
      })
    }
    return res.status(500).json({ erro: 'Erro interno ao cadastrar o tutor.' })
  }
}

//GET /tutores/:id
export const listarTutor = async (req, res) => {
  try {
    const tutorId = req.params
    const tutor = await Tutor.findOne({ where: { tutorId } })

    if (!tutor) {
      return res.status(404).json({ erro: 'Tutor não encontrado' })
    }

    return res.status(200).json(tutor)
  } catch {
    return res.status(500).json({ erro: 'Erro ao buscar dados do tutor' })
  }
}

//PATCH /tutores/:id
export const atualizarTutor = async (req, res) => {
  try {
    const tutorId = req.params
    const tutorPatch = req.body

    const novoTutor = await Tutor.update(tutorPatch, { where: { tutorId } })
    return res.status(200).json(novoTutor)
  } catch {
    return res.status(500).json({ erro: 'Erro interno ao atualizar tutor' })
  }
}
