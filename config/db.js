const Sequelize = require("sequelize");
const sequelize = new Sequelize("node_crud", "root", "", {
  dialect: "mysql",
  host: "localhost",
  query: { raw: true },  
});
module.exports = sequelize;
