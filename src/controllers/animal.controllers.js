import { Animal, PedidoAdocao } from '../models/Modelos.js'
import { animalSchema } from '../schemas/animal.schemas.js'
import { ZodError } from 'zod'

// POST /animais
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
    if (err instanceof ZodError) {
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

// GET /animais
export const listarAnimais = async (req, res) => {
  try {
    const animais = await Animal.findAll({
      where: { adotado: false },
      order: [['createdAt', 'ASC']], // ordena do mais antigo ao mais recente
    })

    const total = animais.length
    return res.status(200).json({ data: animais, total })
  } catch {
    return res.status(500).json({ erro: 'Erro ao buscar animais' })
  }
}

// GET /animais/:id
export const listarAnimal = async (req, res) => {
  try {
    const { id } = req.params

    // busca o animal pelo id
    const animal = await Animal.findByPk(id)

    if (!animal) {
      return res.status(404).json({ erro: 'Animal não encontrado' })
    }

    // busca os pedidos de adoção desse animal
    const pedidos = await PedidoAdocao.findAll({
      attributes: ['id'],
      where: { animalId: id },
      order: [['createdAt', 'ASC']], // do mais antigo para o mais recente
    })

    // monta a resposta conforme a documentação
    return res.status(200).json({
      id: animal.id,
      nome: animal.nome,
      especie: animal.especie,
      porte: animal.porte,
      castrado: animal.castrado,
      vacinado: animal.vacinado,
      adotado: animal.adotado,
      descricao: animal.descricao,
      foto: animal.foto,
      pedidos: pedidos.map((p) => p.id),
    })
  } catch {
    return res.status(500).json({ erro: 'Erro interno ao buscar animal' })
  }
}
