// models/adocao.js
import { DataTypes } from 'sequelize'
import sequelize from '../config/database'

export default (sqlize) => {
  const Adocao = sequelize.define(
    'Adocao',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      adotanteNome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      adotanteEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dataAdocao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      status: {
        type: DataTypes.ENUM('pendente', 'concluída', 'cancelada'),
        allowNull: false,
        defaultValue: 'pendente',
      },
      animalId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'animais', // nome da tabela de Animal
          key: 'id',
        },
      },
    },
    {
      tableName: 'adocoes',
      timestamps: true,
    }
  )

  return Adocao
}
