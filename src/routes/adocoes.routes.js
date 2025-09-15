import { Router } from 'express'
import { criarAdocao } from '../controllers/adocoes.controllers.js'

const router = Router()

// POST /adocoes
router.post('/', criarAdocao)

export default router
