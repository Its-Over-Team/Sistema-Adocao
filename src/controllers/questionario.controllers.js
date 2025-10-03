import { ZodError } from 'zod'
import { Questionario, Tutor } from '../models/Modelos'
import { questionarioSchema } from '../schemas/questionario.schemas'

//POST /questionario
export const criarQuestionario = async (req, res) => {
  try {
    const data = questionarioSchema.parse(req.body)

    const tutorId = data.tutorId

    const tutorExiste = Tutor.findOne(tutorId, {
      where: {
        tutorId,
      },
    })

    if (!tutorExiste) {
      return res.status(404).json({ erro: 'Tutor inexistente.' })
    }

    const novoQuestionario = await Questionario.create(data)

    res.status(201).json(novoQuestionario)
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        erro: 'Todos os campos obrigatórios devem ser preenchidos corretamente.',
      })
    }
    return res.status(500).json({ erro: 'Erro interno ao cadastrar questionário.' })
  }
}
