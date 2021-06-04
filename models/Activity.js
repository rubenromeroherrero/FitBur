const { DataTypes } = require("sequelize");
const dbConnection = require("../config/db");
const { ROUTINE_VISIBILITY } = require("../util/constants");

const Activity = dbConnection.define("Activity", {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
  },
  serie: {
    type: DataTypes.TINYINT.UNSIGNED, // number of series 255
  },
  replay: {
    type: DataTypes.TINYINT.UNSIGNED, // number of replays 255
  },
  repose: {
    type: DataTypes.TINYINT.UNSIGNED, // seconds 255 minutes
  },
  visibility: {
    type: DataTypes.ENUM(Object.values(ROUTINE_VISIBILITY)),
    defaultValue: ROUTINE_VISIBILITY.PUBLIC,
  },
});

module.exports = Activity;
