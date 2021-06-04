const { DataTypes } = require("sequelize");
const dbConnection = require("../config/db");
const { ROUTINE_VISIBILITY } = require("../util/constants");

const Routine = dbConnection.define("Routine", {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  title: {
    type: DataTypes.STRING, // 255
  },
  description: {
    type: DataTypes.TEXT,
  },
  duration: {
    type: DataTypes.SMALLINT.UNSIGNED, // 255 minutes
  },
  date: {
    type: DataTypes.DATE,
  },
  distance: {
    type: DataTypes.SMALLINT.UNSIGNED, // 65535 metres
  },
  visibility: {
    // permite una enumaración, no permite añadir al campo visibility
    // ningun valor que sea diferente a cualquiera de esos valores establecidos en el array
    type: DataTypes.ENUM(Object.values(ROUTINE_VISIBILITY)),
    defaultValue: ROUTINE_VISIBILITY.PUBLIC,
  },
});

module.exports = Routine;
