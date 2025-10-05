import { Router } from 'express'
import multer from 'multer'
import {
  criarAnimais,
  listarAnimais,
  listarAnimal,
} from '../controllers/animal.controllers.js'

const router = Router()
const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post('/', upload.single('foto'), criarAnimais)
router.get('/', listarAnimais)
router.get('/:id', listarAnimal)

export const animalRoutes = router