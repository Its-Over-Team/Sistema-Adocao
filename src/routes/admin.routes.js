import { Router } from "express";

const router = Router()

router.get('/admin/animais', adminListarAnimais)
router.patch('/admin/animais/:id', adminListarAnimal)
router.delete('/admin/animais/:id', adminRemoverAnimal)