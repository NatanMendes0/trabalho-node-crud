const database = require("../config/db");
const Sequelize = require("sequelize");
const Categoria = database.define("categoria", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nome: { type: Sequelize.STRING, allowNull: false },
}, { timestamps: false });

module.exports = Categoria;