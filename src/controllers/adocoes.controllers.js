import {
  Animal,
  Tutor,
  PedidoAdocao,
  Questionario,
} from '../models/Modelos.js'
import { adocaoSchema } from '../schemas/adocao.schemas'
import { ZodError } from 'zod'

//POST /adocoes
export const criarAdocao = async (req, res) => {
  try {
    const data = adocaoSchema.parse(req.body)

    const tutor = await Tutor.findOne({ where: { id: data.tutorId } })
    if (!tutor) {
      return res.status(404).json({ erro: 'Tutor não encontrado' })
    }

    const animal = await Animal.findOne({ where: { id: data.animalId } })
    if (!animal) {
      return res.status(404).json({ erro: 'Animal não encontrado' })
    }

    const questionarioExistente = await Questionario.findOne({
      where: {
        tutorId: data.tutorId,
      },
    })

    if (!questionarioExistente) {
      return res.status(400).json({ erro: 'O tutor ainda não respondeu o questionário obrigatório' })
    }

    const pedidoExistente = await PedidoAdocao.findOne({
      where: {
        tutorId: data.tutorId,
        animalId: data.animalId
      },
    })

    if (pedidoExistente) {
      return res.status(409).json({ erro: 'Este tutor já tem um pedido de adoção para este animal' })
    }

    const total = await PedidoAdocao.findAndCountAll({ where:{
      animailId: data.animalId
    }})

    const posicao = total.count + 1

    const pedidoAdocao = {
      posicao_fila: posicao,
      tutorId: data.tutorId,
      animalId: data.animalId
    }

    const novoPedidoAdocao = await PedidoAdocao.create(pedidoAdocao)

    return res.status(201).json({
      pedido_adocao: novoPedidoAdocao, 
      criado_em: new Date()
    })
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({ erro: 'Todos os campos obrigatórios devem ser preenchidos corretamente' })
    } else {
      return res.status(500).json({ erro: 'Erro ao registrar o pedido de adoção' })
    }
  }
}
