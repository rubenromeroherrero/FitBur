const dbConnection = require("../config/db");
const User = require("../models/User");
const Routine = require("../models/Routine");

// sincronizamos nuestra DB con las entidades, para poder crearlas
const loadModels = () => {
  User.hasMany(Routine, {
    foreignKey: {
      allowNull: false,
    },
  });
  Routine.belongsTo(User);
  dbConnection.sync().then(() => console.log("All models loaded"));
};

module.exports = loadModels;
