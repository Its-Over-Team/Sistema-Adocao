import {Animal, Adocao, Tutor, PedidoAdocao} from '../models/Modelos.js' 
import { adocaoSchema } from '../schemas/adocao.schemas'
import z from 'zod'

//POST /adocoes
export const criarAdocao = async (req, res) => {
  try {
    const data = adocaoSchema.parse(req.body)

    // valida se tutor existe
    const tutor = await Tutor.findOne({ where: data.tutorId })
    if (!tutor) {
      return res.status(404).json({ erro: 'Tutor não encontrado' })
    }

    // valida se animal existe
    const animal = await Animal.findOne({ where: data.animalId })
    if (!animal) {
      return res.status(404).json({ erro: 'Animal não encontrado' })
    }

    const pedidoExistente = await PedidoAdocao.findOne({
      where: {
        tutorId: data.tutorId
      }

    })
    if (pedidoExistente) {
      return res.status(409).json({ erro: 'Este tutor já tem um pedido de adoção para este animal' })
    }

    const novaAdocao = await Adocao.create(data)

    return res.status(201).json(novaAdocao)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        erro: 'Todos os campos obrigatórios devem ser preenchidos corretamente.',
      })
    } else {
      return res.status(500).json({
        erro: 'Erro ao registrar o pedido de adoção',
      })
    }
  }
}
