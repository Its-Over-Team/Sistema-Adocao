import { Router } from 'express'

const router = Router()

router.get('/animais', adminListarAnimais)
router.patch('/animais/:id', adminAtualizarAnimal)
router.delete('/animais/:id', adminRemoverAnimal)
