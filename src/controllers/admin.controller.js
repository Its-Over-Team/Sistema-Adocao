import { Animal } from '../models/Modelos'
import z from 'zod'

export const adminListarAnimais = async (req, res) => {
    try {
        const animais = await Animal.findAll()
        return res.status(200).json(animais)
    } catch {
        return res.status(500).json({ erro: 'Erro ao buscar animais' })
    }
}

export const adminAtualizarAnimal = async (req, res) => {
    try {
        const animalId = req.params

        const animal = await Animal.findOne({ where: data.animalId })
        if (!animal) {
            return res.status(404).json({ erro: 'Animal não encontrado' })
        }

        const animalPatch = req.body

        const novoAnimal = await Tutor.update(animalPatch, { where: animalId })

        return res.status(200).json(novoAnimal)

    } catch (err) {
        if (err instanceof z.ZodError) {
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