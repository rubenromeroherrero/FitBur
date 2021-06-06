const { DataTypes } = require("sequelize");
const dbConnection = require("../config/db");

const Comment = dbConnection.define("Comment", {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  title: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.STRING,
  },
  score: {
    type: DataTypes.TINYINT.UNSIGNED,
  },
});

module.exports = Comment;
