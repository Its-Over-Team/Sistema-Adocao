import { Router } from "express";
import { criarTutor, listarTutor, atualizarTutor } from "../controllers/tutores.controllers";

const router = Router()

router.post('/', criarTutor)
router.get('/:id', listarTutor)
router.patch('/:id', atualizarTutor)