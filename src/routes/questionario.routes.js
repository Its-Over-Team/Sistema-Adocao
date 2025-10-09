import { Router } from 'express'
import { criarQuestionario } from '../controllers/questionario.controllers.js'

const router = Router()

/**
 * @swagger
 * /questionario:
 *   post:
 *     tags: [Questionário]
 *     summary: Cadastra um novo questionário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tutorId:
 *                 type: string
 *               empregado:
 *                 type: boolean
 *               quantos_animais_possui:
 *                 type: integer
 *               motivos_para_adotar:
 *                 type: string
 *               quem_vai_sustentar_o_animal:
 *                 type: string
 *               numero_adultos_na_casa:
 *                 type: integer
 *               numero_criancas_na_casa:
 *                 type: integer
 *               idades_criancas:
 *                 type: array
 *                 items:
 *                   type: integer
 *               residencia_tipo:
 *                 type: string
 *               proprietario_permite_animais:
 *                 type: boolean
 *               todos_de_acordo_com_adocao:
 *                 type: boolean
 *               responsavel_pelo_animal:
 *                 type: string
 *               responsavel_concorda_com_adocao:
 *                 type: boolean
 *               ha_alergico_ou_pessoas_que_nao_gostam:
 *                 type: boolean
 *               gasto_mensal_estimado:
 *                 type: number
 *               valor_disponivel_no_orcamento:
 *                 type: boolean
 *               tipo_alimentacao:
 *                 type: string
 *               local_que_o_animal_vai_ficar:
 *                 type: string
 *               forma_de_permanencia:
 *                 type: string
 *               forma_de_confinamento:
 *                 type: string
 *               tera_brinquedos:
 *                 type: boolean
 *               tera_abrigo:
 *                 type: boolean
 *               tera_passeios_acompanhado:
 *                 type: boolean
 *               tera_passeios_sozinho:
 *                 type: boolean
 *               companhia_outro_animal:
 *                 type: boolean
 *               companhia_humana_24h:
 *                 type: boolean
 *               companhia_humana_parcial:
 *                 type: boolean
 *               sem_companhia_humana:
 *                 type: boolean
 *               sem_companhia_animal:
 *                 type: boolean
 *               o_que_faz_em_viagem:
 *                 type: string
 *               o_que_faz_se_fugir:
 *                 type: string
 *               o_que_faz_se_nao_puder_criar:
 *                 type: string
 *               animais_que_ja_criou:
 *                 type: string
 *               destino_animais_anteriores:
 *                 type: string
 *               costuma_esterilizar:
 *                 type: boolean
 *               costuma_vacinar:
 *                 type: boolean
 *               costuma_vermifugar:
 *                 type: boolean
 *               veterinario_usual:
 *                 type: string
 *               forma_de_educar:
 *                 type: string
 *               envia_fotos_e_videos_do_local:
 *                 type: boolean
 *               aceita_visitas_e_fotos_do_animal:
 *                 type: boolean
 *               topa_entrar_grupo_adotantes:
 *                 type: boolean
 *               concorda_com_taxa_adocao:
 *                 type: boolean
 *               data_disponivel_para_buscar_animal:
 *                 type: string
 *     responses:
 *       201:
 *         description: Questionário cadastrado
 *       404:
 *         description: Tutor inexistente
 *       400:
 *         description: Todos os campos obrigatórios devem ser preenchidos corretamente
 *       500:
 *         description: Erro interno ao cadastrar questionário
 */
router.post('/', criarQuestionario)

export const questionarioRoutes = router