import { Router } from 'express'
import multer from 'multer'

const router = Router()
const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post('/', upload.single('foto'), criarAnimais)
router.get('/', listarAnimais)
router.get('/:id', listarAnimal)
