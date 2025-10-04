import { Animal, Tutor } from '../models/Modelos'
import { ZodError } from 'zod'

//GET /admin/animais
export const adminListarAnimais = async (req, res) => {
  try {
    const animais = await Animal.findAll()
    const total = animais.length
    return res.status(200).json({ data: animais, total })
  } catch {
    return res.status(500).json({ erro: 'Erro ao buscar animais' })
  }
}

//PATCH /admin/animais/:id
export const adminAtualizarAnimal = async (req, res) => {
  try {
    const animalId = req.params

    const animal = await Animal.findOne({ where: { animalId } })
    if (!animal) {
      return res.status(404).json({ erro: 'Animal não encontrado' })
    }

    const animalPatch = req.body

    const novoAnimal = await Tutor.update(animalPatch,{ where: { animalId } }  )

    return res.status(200).json(novoAnimal)
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        erro: 'Nenhum campo foi fornecido para atualização',
      })
    } else {
      return res.status(500).json({
        erro: 'Erro ao atualizar o animal',
      })
    }
  }
}
