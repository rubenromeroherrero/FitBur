const dbConnection = require("../config/db");
const User = require("../models/User");

// sincronizamos nuestra DB con las entidades, para poder crearlas
const loadModels = () => {
  dbConnection.sync().then(() => console.log("All models loaded"));
};

module.exports = loadModels;
