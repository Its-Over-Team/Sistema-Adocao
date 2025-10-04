import { z } from 'zod'

export const adocaoSchema = z.object({
    adotanteNome: z.string(),
    adotanteEmail: z.string(),
    animalId: z.uuid()
})