import { descriptografar } from '../lib/encrypt.js'
import { Tutor } from '../models/Modelos.js'

export async function verificarAdmin(req, res, next) {
  try {
    const tokenHeader = req.headers['user-token']
    const tokenCookie = req.cookies ? req.cookies['user-token'] : undefined
    const token = tokenHeader || tokenCookie

    if (!token) {
      return res.status(401).json({ erro: 'Usuário não autenticado' })
    }

    const idDescriptografado = descriptografar(token)

    const usuario = await Tutor.findOne({ where: { id: idDescriptografado } })

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' })
    }

    if (!usuario.administrador) {
      return res.status(403).json({ erro: 'Acesso não autorizado' })
    }

    next()
  } catch {
    return res
      .status(500)
      .json({ erro: 'Erro na verificação de administrador' })
  }
}
