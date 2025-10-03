import { Animal } from '../models/Modelos'
import { animalSchema } from '../schemas/animal.schemas'
import z from 'zod'

//POST /animais
export const criarAnimais = async (req, res) => {
  try {
    const data = animalSchema.parse(req.body)
    const foto = req.file ? req.file.buffer : null

    const animal = {
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

//GET /animais
export const listarAnimais = async (req, res) => {
  try {
    const animais = await Animal.findAll({
      where: {
        adotado: false,
      },
    })

    const total = animais.length
    return res.status(200).json({ data: animais, total })
  } catch {
    return res.status(500).json({ erro: 'Erro ao buscar animais' })
  }
}

//GET/animais/:id
export const listarAnimal = async (req, res) => {
  try {
    const animalID = req.params
    const animal = await Animal.findOne(animalID)
    if (!animal) {
      return res.status(404).json({ erro: 'Animal não encontrado' })
    }
    return res.status(200).json(animal)
  } catch {
    return res.status(500).json({ erro: 'Erro interno ao buscar animal' })
  }
}
