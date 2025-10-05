import { Router } from 'express'
import {
  criarTutor,
  listarTutor,
  atualizarTutor,
} from '../controllers/tutores.controllers.js'

const router = Router()

router.post('/', criarTutor)
router.get('/:id', listarTutor)
router.patch('/:id', atualizarTutor)

export const tutorRoutes = router