const {
  insertRoutineSchema,
  updateRoutineSchema,
} = require("../validations/routineValidations");
const routineRepository = require("../repositories/routineRepository");
const HttpError = require("../util/httpError");

// GET ALL ROUTINES
exports.getAllRoutines = async (user) => {
  // filtro ADMIN (public,private) USER(public)
  const filter = user?.role === "user";
  return await routineRepository.findAllRoutines(filter);
};

// --> buscar todos los posts del usuario loggeado ???????

// GET ONE ROUTINE
exports.getRoutineById = async (user, id) => {
  // comprobamos que esa rutina se encuentre en la DB
  const routine = await routineRepository.findRoutineById(id);

  if (!routine) throw new HttpError(404, "Routine not found in databases");

  // Controlamos que si no es el usuario de la rutina, y esta privada, no la pueda ver, salvo que sea admin
  if (
    routine.UserId !== user.id &&
    routine.visibility !== "public" &&
    user.role !== "admin"
  )
    throw new HttpError(
      401,
      "You can't watch this routine, because it's private. You must logging with correctly account"
    );

  return routine.toJSON();
};

// CREATE
exports.createRoutine = async (routine) => {
  const routineValidation = await insertRoutineSchema.validateAsync(routine);

  await routineRepository.insertRoutine(routineValidation);
};

// EDIT ROUTINE
exports.editRoutine = async (user, { id, ...routineDetails }) => {
  //comprobamos la existencia de esa rutina
  const routine = await routineRepository.findRoutineById(id);

  if (!routine) throw new HttpError(404, "Routine not found in databases");

  // validamos que la info que introduce es correcta/filtro
  const checkRoutine = await updateRoutineSchema.validateAsync(routineDetails);

  //if (!checkRoutine) throw new Error(); --> no hace falta en los JOI, lanzan error auto

  // controlar que la rutina pertenece al usuario que está queriendo editarla
  if (routine.UserId !== user.id)
    throw new HttpError(
      401,
      "Routine you want to edit isn't yours. Please, you need logging with correct account"
    );

  await routineRepository.updateRoutine(id, checkRoutine);
};

// DELETE ROUTINE
exports.removeRoutine = async (user, id) => {
  //Comprobamos la existencia de esa rutina
  const routine = await routineRepository.findRoutineById(id);

  if (!routine) throw new HttpError(404, "Routine not found in databases");

  // comprobacion de que esa rutina sea del usuario logged
  if (routine.UserId !== user.id)
    throw new HttpError(
      401,
      "Routine you want to edit isn't yours. Please, you need logging with correct account"
    );

  await routineRepository.deleteRoutine(routine.id);
};
