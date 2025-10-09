import { Router } from 'express'
import { fazerLogin } from '../controllers/login.controllers.js'

const router = Router()

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Login]
 *     summary: Realiza login do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 *       400:
 *         description: Todos os campos obrigatórios devem ser preenchidos corretamente
 *       500:
 *         description: Erro interno ao tentar fazer o login
 */
router.post('/', fazerLogin)

export const loginRoutes = router