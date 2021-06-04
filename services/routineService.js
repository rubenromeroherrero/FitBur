const {
  insertRoutineSchema,
  updateRoutineSchema,
} = require("../validations/routineValidations");
const routineRepository = require("../repositories/routineRepository");

// GET ALL ROUTINES
exports.getAllRoutines = async () => {
  return await routineRepository.findAllRoutines();
};

// --> buscar todos los posts del usuario loggeado ???????

// GET ONE ROUTINE
exports.getRoutineById = async (id) => {
  // comprobamos que esa rutina se encuentre en la DB
  const routine = await routineRepository.findRoutineById(id);

  if (!routine) throw new Error();

  // comprobamos que sea publica
  if (routine.visibility === "private")
    throw new Error("You don't have permission");

  return routine.toJSON();
};

// CREATE
exports.createRoutine = async (routine) => {
  const routineValidation = await insertRoutineSchema.validateAsync(routine);

  await routineRepository.insertRoutine(routineValidation);
};

// EDIT ROUTINE
exports.editRoutine = async (user, routineDetails, routineId) => {
  //comprobamos la existencia de esa rutina
  const routine = await routineRepository.findRoutineById(routineId);

  if (!routine) throw new Error();

  // validamos que la info que introduce es correcta/filtro
  const checkRoutine = await updateRoutineSchema.validateAsync(routineDetails);

  if (!checkRoutine) throw new Error();

  // controlar que la rutina pertenece al usuario que está queriendo editarla
  if (routine.UserId !== user.id) throw new Error(401);

  await routineRepository.updateRoutine(routineId, checkRoutine);
};

// DELETE ROUTINE
exports.removeRoutine = async (user, id) => {
  //Comprobamos la existencia de esa rutina
  const routine = await routineRepository.findRoutineById(id);

  if (!routine) throw new Error();

  // comprobacion de que esa rutina sea del usuario logged
  if (routine.UserId !== user.id) throw new Error();

  await routineRepository.deleteRoutine(routine.id);
};
