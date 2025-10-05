import { Animal } from '../models/Modelos.js'
import { ZodError } from 'zod'

// GET /admin/animais
export const adminListarAnimais = async (req, res) => {
  try {
    const animais = await Animal.findAll()
    const total = animais.length

    return res.status(200).json({ data: animais, total })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ erro: 'Erro ao buscar animais' })
  }
}

// PATCH /admin/animais/:id
export const adminAtualizarAnimal = async (req, res) => {
  try {
    const { id } = req.params
    const camposAtualizar = req.body

    if (!camposAtualizar || Object.keys(camposAtualizar).length === 0) {
      return res
        .status(400)
        .json({ erro: 'Nenhum campo foi fornecido para atualização' })
    }

    const animal = await Animal.findByPk(id)
    if (!animal) {
      return res.status(404).json({ erro: 'Animal não encontrado' })
    }

    await animal.update(camposAtualizar)

    return res.status(200).json({
      id: animal.id,
      nome: animal.nome,
      castrado: animal.castrado,
      vacinado: animal.vacinado,
      adotado: animal.adotado,
      descricao: animal.descricao,
      updated_at: animal.updatedAt,
    })
  } catch (err) {
    if (err instanceof ZodError) {
      return res
        .status(400)
        .json({ erro: 'Nenhum campo foi fornecido para atualização' })
    }

    console.error(err)
    return res.status(500).json({ erro: 'Erro ao atualizar o animal' })
  }
}

// DELETE /admin/animais/:id
export const adminRemoverAnimal = async (req, res) => {
  try {
    const { id } = req.params

    const animal = await Animal.findByPk(id)
    if (!animal) {
      return res.status(404).json({ erro: 'Animal não encontrado' })
    }

    await animal.destroy()

    return res.status(204).send()
  } catch (err) {
    console.error(err)
    return res.status(500).json({ erro: 'Erro ao remover animal' })
  }
}
