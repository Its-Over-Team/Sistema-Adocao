import { Router } from 'express'
import { criarDoacao } from '../controllers/doacoes.controllers.js'

const router = Router()

/**
 * @swagger
 * /doacoes:
 *   post:
 *     tags: [Doações]
 *     summary: Cadastra uma nova doação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               valor:
 *                 type: number
 *               mensagem:
 *                 type: string
 *     responses:
 *       201:
 *         description: Doação cadastrada
 *       400:
 *         description: Valor da doação é obrigatório e deve ser um número positivo
 *       500:
 *         description: Erro ao processar a doação
 */
router.post('/', criarDoacao)

export const doacoesRoutes = router