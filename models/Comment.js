const { DataTypes } = require("sequelize");
const dbConnection = require("../config/db");
const { COMMENT_VISIBILITY } = require("../util/constants");

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
  visibility: {
    type: DataTypes.ENUM(Object.values(COMMENT_VISIBILITY)),
    defaultValue: COMMENT_VISIBILITY.PUBLIC,
  },
});

module.exports = Comment;
