import { Router } from "express";

const router = Router()

router.post('/', criarTutor)
router.get('/:id', listarTutor)
router.patch('/:id', atualizarTutor)