const { DataTypes } = require("sequelize");
const dbConnection = require("../config/db");

const User = dbConnection.define(
  "User",
  {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING(10),
      defaultValue: "user",
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    age: {
      type: DataTypes.TINYINT, // 2 cifras max
    },
    height: {
      type: DataTypes.TINYINT.UNSIGNED, // 255 cm max
    },
    weight: {
      type: DataTypes.TINYINT.UNSIGNED, // 255 kg max
    },
  },
  {
    // scope para oprimir info password
    defaultScope: { attributes: { exclude: ["password"] } },
    // para comprobaciones de password
    scopes: { withPassword: { attributes: {} } },
  }
);

// mostrar usuario, sin contraseña
User.prototype.toJSON = function () {
  // copia del objeto User
  const attributes = Object.assign({}, this.get());
  delete attributes.password;
  return attributes;
};

module.exports = User;
