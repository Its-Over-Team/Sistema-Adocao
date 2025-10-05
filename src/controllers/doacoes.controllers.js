import { ZodError } from 'zod'
import { gerarPix, gerarQr } from '../lib/pixqrcode.js'
import { Doacao } from '../models/Modelos.js'
import { doacoesSchema } from '../schemas/doacao.schemas.js'

// POST /doacoes
export const criarDoacao = async (req, res) => {
  try {
    const data = doacoesSchema.parse(req.body)

    // Gera link PIX e QR Code
    const linkPix = gerarPix(data.valor)
    const qrCode = await gerarQr(linkPix)

    // Cria registro da doação no banco
    const novaDoacao = await Doacao.create({
      nome: data.nome,
      email: data.email,
      valor: data.valor,
      mensagem: data.mensagem,
      linkPix: linkPix,
    })

    // Retorno no formato exigido pela documentação
    const resposta = {
      doacao_id: novaDoacao.id,
      nome: novaDoacao.nome,
      valor: novaDoacao.valor,
      mensagem: novaDoacao.mensagem,
      linkPix: novaDoacao.linkPix,
      qrcode: qrCode,
    }

    return res.status(201).json(resposta)
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        erro: 'Valor da doação é obrigatório e deve ser um número positivo',
      })
    }

    return res.status(500).json({
      erro: 'Erro ao processar a doação',
    })
  }
}
