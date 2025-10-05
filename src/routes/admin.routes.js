import { Router } from 'express'
import {
  adminListarAnimais,
  adminAtualizarAnimal,
  adminRemoverAnimal,
} from '../controllers/admin.controllers.js'
import { verificarAdmin } from '../middlewares/adminAuth.js'

const router = Router()


router.use(verificarAdmin)

router.get('/animais', adminListarAnimais)
router.patch('/animais/:id', adminAtualizarAnimal)
router.delete('/animais/:id', adminRemoverAnimal)

export const adminRoutes = router