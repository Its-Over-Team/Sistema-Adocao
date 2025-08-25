import { Router } from "express";

const router = Router()

router.post('/animais', criarAnimais)
router.get('/animais', listarAnimais)
router.get('/animais/:id', listarAnimal)