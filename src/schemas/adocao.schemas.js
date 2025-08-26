import { z } from 'zod'

export const adocaoSchema = z.object({
    tutorId: z.uuid(),
    animalId: z.uuid()
})