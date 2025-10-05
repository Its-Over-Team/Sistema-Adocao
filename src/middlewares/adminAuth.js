import { Tutor } from '../models/Modelos.js'

export async function verificarAdmin(req, res, next) {
  try {
    const email = req.headers['user-email']

    if (!email) {
      return res.status(401).json({ erro: 'Usuário não autenticado' })
    }

    const usuario = await Tutor.findOne({ where: { email } })

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' })
    }

    if (!usuario.administrador) {
      return res.status(403).json({ erro: 'Acesso não autorizado' })
    }

    next()
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ erro: 'Erro na verificação de administrador' })
  }
}
