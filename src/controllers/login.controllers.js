import { ZodError } from 'zod'
import { loginSchema } from '../schemas/login.schemas.js'
import { Tutor } from '../models/Modelos.js'
import { descriptografar } from '../lib/encrypt.js'

// POST /login
export const fazerLogin = async (req, res) => {
  try {
    const data = loginSchema.parse(req.body)

    const tutor = await Tutor.findOne({ where: { email: data.email } })

    if (!tutor) {
      return res.status(401).json({ erro: 'Email ou senha inválidos.' })
    }

    const senhaDescriptografada = descriptografar(tutor.senha)

    if (data.senha !== senhaDescriptografada) {
      return res.status(401).json({ erro: 'Email ou senha inválidos.' })
    }

    return res.status(200).json({ message: 'Login bem-sucedido' })
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        erro: 'Todos os campos obrigatórios devem ser preenchidos corretamente.',
      })
    }

    return res
      .status(500)
      .json({ erro: 'Erro interno ao tentar fazer o login.' })
  }
}
