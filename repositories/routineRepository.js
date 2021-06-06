// conexion con DB
const User = require("../models/User");
const Routine = require("../models/Routine");
// const { ROUTINE_VISIBILITY } = require("../util/constants");

// MODELO REPRESENTACION USUARIO EN ROUTINE
// const info = {
//   include: [
//     {
//       model: User,
//       attributes: ["name"],
//     },
//   ],
// };

// --> buscar todos los posts del usuario loggeado?????

// FIND
exports.findAllRoutines = async () => {
  // filtro solo los public
  return await Routine.findAll({
    where: { visibility: ["public"] },
    include: { model: User, attributes: ["name"] },
  });
};

exports.findRoutineById = async (id) => {
  return await Routine.findByPk(id);
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
