import { Animal, Tutor, PedidoAdocao, Questionario } from '../models/Modelos.js'
import { adocaoSchema } from '../schemas/adocao.schemas.js'
import { ZodError } from 'zod'

// POST /adocoes
export const criarAdocao = async (req, res) => {
  try {
    const data = adocaoSchema.parse(req.body)

    // verifica tutor
    const tutor = await Tutor.findOne({ where: { id: data.tutorId } })
    if (!tutor) {
      return res.status(404).json({ erro: 'Tutor ou animal não encontrado' })
    }

    // verifica animal
    const animal = await Animal.findOne({ where: { id: data.animalId } })
    if (!animal) {
      return res.status(404).json({ erro: 'Tutor ou animal não encontrado' })
    }

    // verifica se o tutor respondeu o questionário
    const questionarioExistente = await Questionario.findOne({
      where: { tutorId: data.tutorId },
    })

    if (!questionarioExistente) {
      return res.status(400).json({
        erro: 'O tutor ainda não respondeu o questionário obrigatório',
      })
    }

    // verifica se já existe um pedido para o mesmo tutor e animal
    const pedidoExistente = await PedidoAdocao.findOne({
      where: {
        tutorId: data.tutorId,
        animalId: data.animalId,
      },
    })

    if (pedidoExistente) {
      return res.status(409).json({
        erro: 'Este tutor já tem um pedido de adoção para este animal',
      })
    }

    // conta quantos pedidos já existem para o mesmo animal
    const totalPedidos = await PedidoAdocao.count({
      where: { animalId: data.animalId },
    })

    // posição na fila
    const posicao = totalPedidos + 1

    // cria o pedido
    const novoPedidoAdocao = await PedidoAdocao.create({
      tutorId: data.tutorId,
      animalId: data.animalId,
      status: 'em_analise',
      posicao_fila: posicao,
    })

    return res.status(201).json({
      id: novoPedidoAdocao.id,
      tutor_id: novoPedidoAdocao.tutorId,
      animal_id: novoPedidoAdocao.animalId,
      status: novoPedidoAdocao.status,
      posicao_fila: novoPedidoAdocao.posicao_fila,
      criado_em: novoPedidoAdocao.createdAt,
    })
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        erro: 'Todos os campos obrigatórios devem ser preenchidos corretamente',
      })
    } else {
      console.error(err)
      return res
        .status(500)
        .json({ erro: 'Erro ao registrar o pedido de adoção' })
    }
  }
}
