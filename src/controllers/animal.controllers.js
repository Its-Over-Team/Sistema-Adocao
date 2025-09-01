import { animalSchema } from '../schemas/animal.schemas'
import { randomUUID } from 'crypto'
import z from 'zod'

export const criarAnimais = async (req, res) => {
  try {
    const data = animalSchema.parse(req.body)
    const foto = req.file ? req.file.buffer : null

    const animal = {
      id: randomUUID(),
      ...data,
      foto,
    }

    const novoAnimal = await Animal.create(animal)

    return res.status(201).json(novoAnimal)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        erro: 'Todos os campos obrigatórios devem ser preenchidos corretamente.',
      })
    } else {
      return res.status(500).json({
        erro: 'Erro interno ao cadastrar o animal.',
      })
    }
  }
}
