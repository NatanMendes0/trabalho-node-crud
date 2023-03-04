const database = require("../config/db");
const Sequelize = require("sequelize");
const Categoria = require("./categoria");
const Jogo = database.define(
  "jogo",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nome: { type: Sequelize.STRING, allowNull: false },
    descricao: Sequelize.STRING,
    preco: Sequelize.FLOAT,
    imagem: { type: Sequelize.STRING },
    categoria_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Categoria,
        key: "id",
      },
    },
  },
  { timestamps: false }
);
module.exports = Jogo;
