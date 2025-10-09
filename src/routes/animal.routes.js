import { Router } from 'express'
import multer from 'multer'
import {
  criarAnimais,
  listarAnimais,
  listarAnimal,
} from '../controllers/animal.controllers.js'

const router = Router()
const storage = multer.memoryStorage()
const upload = multer({ storage })

/**
 * @swagger
 * /animais:
 *   post:
 *     tags: [Animal]
 *     summary: Cadastra um novo animal
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               especie:
 *                 type: string
 *               porte:
 *                 type: string
 *               castrado:
 *                 type: boolean
 *               vacinado:
 *                 type: boolean
 *               adotado:
 *                 type: boolean
 *               descricao:
 *                 type: string
 *               foto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Animal cadastrado com sucesso
 *       400:
 *         description: Todos os campos obrigatórios devem ser preenchidos corretamente
 *       500:
 *         description: Erro interno ao cadastrar o animal
 */
router.post('/', upload.single('foto'), criarAnimais)

/**
 * @swagger
 * /animais:
 *   get:
 *     tags: [Animal]
 *     summary: Lista todos os animais disponíveis para adoção
 *     responses:
 *       200:
 *         description: Lista de animais
 *       500:
 *         description: Erro ao buscar animais
 */
router.get('/', listarAnimais)

/**
 * @swagger
 * /animais/{id}:
 *   get:
 *     tags: [Animal]
 *     summary: Busca um animal pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Animal encontrado
 *       404:
 *         description: Animal não encontrado
 *       500:
 *         description: Erro interno ao buscar animal
 */
router.get('/:id', listarAnimal)

export const animalRoutes = router
