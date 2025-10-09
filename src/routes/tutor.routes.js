import { Router } from 'express'
import {
  criarTutor,
  listarTutor,
  atualizarTutor,
} from '../controllers/tutores.controllers.js'

const router = Router()

/**
 * @swagger
 * /tutor:
 *   post:
 *     tags: [Tutor]
 *     summary: Cadastra um novo tutor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome_completo:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               cidade:
 *                 type: string
 *               estado:
 *                 type: string
 *               idade:
 *                 type: integer
 *               telefone:
 *                 type: string
 *               celular:
 *                 type: string
 *               cpf:
 *                 type: string
 *               endereco:
 *                 type: string
 *               bairro:
 *                 type: string
 *               cep:
 *                 type: integer
 *               instagram:
 *                 type: string
 *               facebook:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tutor cadastrado
 *       400:
 *         description: Todos os campos obrigatórios devem ser preenchidos corretamente
 *       500:
 *         description: Erro interno ao cadastrar o tutor
 */
router.post('/', criarTutor)

/**
 * @swagger
 * /tutor/{id}:
 *   get:
*     tags: [Tutor]
 *     summary: Busca um tutor pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tutor encontrado
 *       404:
 *         description: Tutor não encontrado
 *       500:
 *         description: Erro ao buscar dados do tutor
 */
router.get('/:id', listarTutor)

/**
 * @swagger
 * /tutor/{id}:
 *   patch:
 *     tags: [Tutor]
 *     summary: Atualiza dados do tutor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome_completo:
 *                 type: string
 *               cidade:
 *                 type: string
 *               estado:
 *                 type: string
 *               idade:
 *                 type: integer
 *               telefone:
 *                 type: string
 *               celular:
 *                 type: string
 *               endereco:
 *                 type: string
 *               bairro:
 *                 type: string
 *               instagram:
 *                 type: string
 *               facebook:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tutor atualizado
 *       404:
 *         description: Tutor não encontrado
 *       400:
 *         description: Pelo menos um campo deve ser enviado para atualização
 *       500:
 *         description: Erro ao atualizar os dados do tutor
 */
router.patch('/:id', atualizarTutor)

export const tutorRoutes = router