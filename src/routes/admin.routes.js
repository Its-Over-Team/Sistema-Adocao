import { Router } from 'express'
import {
  adminListarAnimais,
  adminAtualizarAnimal,
  adminRemoverAnimal,
} from '../controllers/admin.controllers.js'
import { verificarAdmin } from '../middlewares/adminAuth.js'

const router = Router()


router.use(verificarAdmin)

/**
 * @swagger
 * /admin/animais:
 *   get:
 *     tags: [Admin]
 *     summary: Lista todos os animais (admin)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de animais
 *       500:
 *         description: Erro ao buscar animais
 */
router.get('/animais', adminListarAnimais)

/**
 * @swagger
 * /admin/animais/{id}:
 *   patch:
 *     tags: [Admin]
 *     summary: Atualiza dados de um animal (admin)
 *     security:
 *       - bearerAuth: []
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
 *     responses:
 *       200:
 *         description: Animal atualizado
 *       400:
 *         description: Nenhum campo foi fornecido para atualização
 *       404:
 *         description: Animal não encontrado
 *       500:
 *         description: Erro ao atualizar o animal
 */
router.patch('/animais/:id', adminAtualizarAnimal)

/**
 * @swagger
 * /admin/animais/{id}:
 *   delete:
 *     tags: [Admin]
 *     summary: Remove um animal (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Animal removido
 *       404:
 *         description: Animal não encontrado
 *       500:
 *         description: Erro ao remover animal
 */
router.delete('/animais/:id', adminRemoverAnimal)

export const adminRoutes = router