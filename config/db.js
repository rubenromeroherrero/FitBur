const { Sequelize } = require("sequelize");

// requerimos variables de entorno
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// establecemos la conexión con DB
const dbConnection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});

module.exports = dbConnection;
