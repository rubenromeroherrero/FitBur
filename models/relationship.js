const dbConnection = require("../config/db");
const User = require("../models/User");
const Routine = require("../models/Routine");
const Activity = require("../models/Activity");
const Comment = require("../models/Comment");

// sincronizamos nuestra DB con las entidades, para poder crearlas
const loadModels = () => {
  //----- user<-->routine
  User.hasMany(Routine, {
    foreignKey: {
      allowNull: false,
    },
  });

  Routine.belongsTo(User);
  //----- user<-->routine<-->activity
  Routine.hasMany(Activity, {
    foreignKey: {
      allowNull: false,
    },
  });
  User.hasMany(Activity, {
    foreignKey: {
      allowNull: false,
    },
  });
  Activity.belongsTo(Routine);
  Activity.belongsTo(User);

  dbConnection.sync().then(() => console.log("All models loaded"));
};

module.exports = loadModels;
