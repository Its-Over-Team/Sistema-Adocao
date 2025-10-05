import { Router } from 'express'
import { criarAdocao } from '../controllers/adocoes.controllers.js'

const router = Router()

router.post('/', criarAdocao)

export const adocoesRoutes = router