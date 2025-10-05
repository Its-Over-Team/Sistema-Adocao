import { gerarPix, gerarQr } from '../lib/pixqrcode'
import { Doacao } from '../models/Modelos'
import { doacoesSchema } from '../schemas/doacao.schemas'
import { email, ZodError } from 'zod'

//POST /doacoes
export const criarDoacao = async (req, res) => {
  try {
    const data = doacoesSchema.parse(req.body)

    const linkPix = gerarPix(data.valor)
    const qrCode = await gerarQr(linkPix)

    const doacao = {
      nome: data.nome,
      email: data.email,
      valor: data.valor,
      mensagem: data.mensagem,
      linkPix: linkPix,
    }
    const doacaoResposta = {
      nome: data.nome,
      valor: data.valor,
      mensagem: data.mensagem,
      linkPix: linkPix,
      qrcode: qrCode
    }

    const novaDoacao = await Doacao.create(doacao)

    console.log(novaDoacao)

    return res.status(201).json(doacaoResposta)
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
