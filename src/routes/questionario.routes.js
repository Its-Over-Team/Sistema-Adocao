import { Router } from 'express'
import { criarQuestionario } from '../controllers/questionario.controllers.js'

const router = Router()

router.post('/', criarQuestionario)

export const questionarioRoutes = router