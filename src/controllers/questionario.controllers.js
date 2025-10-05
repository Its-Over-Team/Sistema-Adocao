import { ZodError } from 'zod'
import { Questionario, Tutor } from '../models/Modelos.js'
import { questionarioSchema } from '../schemas/questionario.schemas.js'

// POST /questionario
export const criarQuestionario = async (req, res) => {
  try {
    const data = questionarioSchema.parse(req.body)
    const { tutorId } = data

    // Verifica se o tutor existe
    const tutorExiste = await Tutor.findOne({
      where: { id: tutorId },
    })

    if (!tutorExiste) {
      return res.status(404).json({ erro: 'Tutor inexistente.' })
    }

    // Cria o questionário
    const novoQuestionario = await Questionario.create(data)

    return res.status(201).json(novoQuestionario)
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        erro: 'Todos os campos obrigatórios devem ser preenchidos corretamente.',
      })
    }

    return res
      .status(500)
      .json({ erro: 'Erro interno ao cadastrar questionário.' })
  }
}
