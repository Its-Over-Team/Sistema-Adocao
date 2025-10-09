import { Router } from 'express'
import { criarAdocao } from '../controllers/adocoes.controllers.js'

const router = Router()

/**
 * @swagger
 * /adocoes:
 *   post:
 *     tags: [Adoções]
 *     summary: Cadastra um novo pedido de adoção
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tutorId:
 *                 type: string
 *               animalId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pedido de adoção cadastrado
 *       400:
 *         description: Todos os campos obrigatórios devem ser preenchidos corretamente
 *       500: 
 *         description: Erro ao registrar o pedido de adoção
 */
router.post('/', criarAdocao)

export const adocoesRoutes = router