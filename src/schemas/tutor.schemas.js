import { z } from 'zod';

export const tutorSchema = z.object({
    nome_completo: z.string(),
    email: z.string().email(),
    senha: z.string(),
    cidade: z.string(),
    estado: z.string(),
    idade: z.number().int(),
    telefone: z.string(),
    celular: z.string().optional().nullable(),
    endereco: z.string().optional().nullable(),
    bairro: z.string().optional().nullable(),
    cep: z.number().int().optional().nullable(),
    instagram: z.string().optional().nullable(),
    facebook: z.string().optional().nullable(),
    administrador: z.boolean().optional().nullable(),
})