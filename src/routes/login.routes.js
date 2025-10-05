import { Router } from 'express'
import { fazerLogin } from '../controllers/login.controllers.js'

const router = Router()

router.post('/', fazerLogin)

export const loginRoutes = router