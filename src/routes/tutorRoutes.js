import { Router } from "express";

const router = Router()

router.post('/tutores', criarTutor)
router.get('/tutores/:id', listarTutor)
router.patch('/tutores/:id', atualizarTutor)