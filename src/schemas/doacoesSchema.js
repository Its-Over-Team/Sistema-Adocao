import { z } from 'zod'

export const doacoesSchema = z.object({
  nome: z.string(),
  email: z.string().email,
  valor: z.number().positive,
  mensagem: z.string()
})