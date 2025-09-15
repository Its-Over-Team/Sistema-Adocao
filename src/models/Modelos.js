import AnimalModel from './Animal.js'
import TutorModel from './Usuario.js'
import QuestionarioModel from './Questionario.js'
import PedidoAdocaoModel from './PedidoAdocao.js'
import DoacaoModel from './Doacoes.js'
import AdocaoModel from './Adocoes.js'
import sequelize from '../config/database'

export const Animal = AnimalModel(sequelize)
export const Tutor = TutorModel(sequelize)
export const Questionario = QuestionarioModel(sequelize)
export const PedidoAdocao = PedidoAdocaoModel(sequelize)
export const Adocao = AdocaoModel(sequelize)
export const Doacao = DoacaoModel(sequelize)

// Associações
// Explicação das associações:
// - Um Tutor tem um Questionario.
// - Um Tutor pode ter vários Pedidos de Adoção.
// - Um Animal pode ter vários Pedidos de Adoção.
// A tabela PedidosAdocao serve como uma tabela de junção entre Tutores e Animais.

await sequelize.sync()

export default { Animal, Tutor, Questionario, PedidoAdocao, Doacao, Adocao }
