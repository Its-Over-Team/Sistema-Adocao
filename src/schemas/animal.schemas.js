import { z } from 'zod';

export const animalSchema = z.object({
    nome: z.string(),
    especie: z.string(),
    porte: z.string(),
    vacinado: z.boolean(),
    castrado: z.boolean(),
    adotado: z.boolean(),
    descricao: z.string(),
    foto: z.any()
})