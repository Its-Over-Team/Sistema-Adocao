import { Doacao } from '../models/Modelos'
import { doacoesSchema } from '../schemas/doacao.schemas'
import { ZodError } from 'zod'

//POST /doacoes
export const criarDoacao = async (req, res) => {
  try {
    const data = doacoesSchema.parse(req.body)

    const novaDoacao = await Doacao.create(data)

    return res.status(201).json(novaDoacao)
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        erro: 'Valor da doação é obrigatório e deve ser um número positivo',
      })
    } else {
      return res.status(500).json({
        erro: 'Erro ao processar a doação',
      })
    }
  }
}
