import { ZodError } from 'zod'
import { Questionario, Tutor } from '../models/Modelos.js'
import { tutorSchema } from '../schemas/tutor.schemas.js'
import { criptografar } from '../lib/encrypt.js'

// POST /tutores
export const criarTutor = async (req, res) => {
  try {
    const data = tutorSchema.parse(req.body)

    // Verificação de email duplicado
    const emailExistente = await Tutor.findOne({
      where: { email: data.email },
    })

    if (emailExistente) {
      return res.status(400).json({
        erro: 'Email preenchido já está sendo utilizado.',
      })
    }

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
      telefoneExistente ||
      celularExistente ||
      instagramExistente ||
      facebookExistente
    ) {
      return res.status(400).json({
        erro: 'Todos os campos obrigatórios devem ser preenchidos corretamente.',
      })
    }

    // Criptografar senha
    const senhaCriptografada = criptografar(data.senha)

    // Criar tutor
    const novoTutor = await Tutor.create({
      ...data,
      senha: senhaCriptografada,
    })

    // Caso o questionário venha junto no body
    if (data.questionario) {
      await Questionario.create({
        ...data.questionario,
        tutorId: novoTutor.id,
      })
    }

    return res.status(201).json(novoTutor)
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        erro: 'Todos os campos obrigatórios devem ser preenchidos corretamente.',
      })
    }
    return res.status(500).json({ erro: 'Erro interno ao cadastrar o tutor.' })
  }
}

// GET /tutores/:id
export const listarTutor = async (req, res) => {
  try {
    const { id } = req.params

    const tutor = await Tutor.findOne({
      where: { id },
      attributes: [
        'id',
        'nome_completo',
        'rg',
        'endereco',
        'bairro',
        'cidade',
        'estado',
        'celular',
        'telefone',
        'email',
        'instagram',
        'facebook',
      ],
    })

    if (!tutor) {
      return res.status(404).json({ erro: 'Tutor não encontrado' })
    }

    const questionario = await Questionario.findOne({
      where: { tutorId: id },
    })

    return res.status(200).json({
      ...tutor.dataValues,
      questionario: questionario ? questionario.dataValues : null,
    })
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao buscar dados do tutor' })
  }
}

// PATCH /tutores/:id
export const atualizarTutor = async (req, res) => {
  try {
    const { id } = req.params
    const tutorPatch = req.body

    const tutor = await Tutor.findOne({ where: { id } })
    if (!tutor) {
      return res.status(404).json({ erro: 'Tutor não encontrado' })
    }

    if (!tutorPatch || Object.keys(tutorPatch).length === 0) {
      return res
        .status(400)
        .json({ erro: 'Pelo menos um campo deve ser enviado para atualização' })
    }

    // Atualiza questionário se existir no body
    if (tutorPatch.questionario) {
      const questionarioExistente = await Questionario.findOne({
        where: { tutorId: id },
      })

      if (questionarioExistente) {
        await Questionario.update(tutorPatch.questionario, {
          where: { tutorId: id },
        })
      } else {
        await Questionario.create({
          ...tutorPatch.questionario,
          tutorId: id,
        })
      }

      delete tutorPatch.questionario
    }

    // Atualiza dados do tutor
    await Tutor.update(tutorPatch, { where: { id } })

    const tutorAtualizado = await Tutor.findOne({
      where: { id },
      attributes: ['id', 'nome_completo', 'email', 'cidade', 'estado'],
    })

    const questionarioAtualizado = await Questionario.findOne({
      where: { tutorId: id },
    })

    return res.status(200).json({
      ...tutorAtualizado.dataValues,
      questionario: questionarioAtualizado
        ? questionarioAtualizado.dataValues
        : null,
    })
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao atualizar os dados do tutor' })
  }
}
