import { z } from 'zod';

const tipoVerificado = z.preprocess((valor)=>{
    if ( valor.trim().toLowerCase() === 'true' ) return true
    if ( valor.trim().toLowerCase() === 'false' ) return false

    return valor
}, z.boolean())

export const animalSchema = z.object({
    nome: z.string(),
    especie: z.string(),
    porte: z.string(),
    vacinado: tipoVerificado,
    castrado: tipoVerificado,
    adotado: tipoVerificado,
    descricao: z.string(),
    foto: z.any()
})