import { Router } from 'express'
import { criarDoacao } from '../controllers/doacoes.controllers.js'

const router = Router()

router.post('/', criarDoacao)

export const doacoesRoutes = router