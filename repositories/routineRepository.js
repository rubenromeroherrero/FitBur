// conexion con DB
const User = require("../models/User");
const Routine = require("../models/Routine");
const Activity = require("../models/Activity");
const Comment = require("../models/Comment");

// --> buscar todos los posts del usuario loggeado?????

// FIND
exports.findAllRoutines = async (filter) => {
  // filtro ADMIN (public,private) USER(public)
  const where = filter ? { visibility: "public" } : {};
  return await Routine.findAll({
    where,
    include: [
      { model: User, attributes: ["name"] },
      {
        model: Comment,
        attributes: ["title", "content", "score", "visibility"],
      },
      {
        model: Activity,
        attributes: ["name", "serie", "replay", "repose", "visibility"],
      },
    ],
  });
};

exports.findRoutineById = async (id) => {
  return await Routine.findByPk(id, {
    where: { visibility: ["public"] }, // si quito esto el admin puede ver todas ???
    include: [
      { model: User, attributes: ["name"] },
      { model: Comment, attributes: ["title", "content", "score"] },
      { model: Activity },
    ],
  });
};

// INSERT
exports.insertRoutine = async (routine) => {
  return await Routine.create(routine);
};

// UPDATE
exports.updateRoutine = async (id, routineDetails) => {
  return await Routine.update(routineDetails, { where: { id } });
};

// DELETE
exports.deleteRoutine = async (id) => {
  return await Routine.destroy({ where: { id } });
};
