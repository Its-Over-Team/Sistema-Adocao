import { Router } from "express";

const router = Router()

router.post('/', criarAnimais)
router.get('/', listarAnimais)
router.get('/:id', listarAnimal)