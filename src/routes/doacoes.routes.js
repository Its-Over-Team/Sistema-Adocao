import { Router } from 'express'
import { criarDoacao } from '../controllers/doacoes.controllers.js'

const router = Router()

// POST /doacoes
router.post('/', criarDoacao)

export default router
