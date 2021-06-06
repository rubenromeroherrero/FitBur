const activityRepository = require("../repositories/activityRepository");
const {
  insertActivitySchema,
  updateActivitySchema,
} = require("../validations/activityValidations");

// GET ALL ACTIVITIES
exports.getAllActivities = async () => {
  return await activityRepository.findAllActivities();
};

// GET ACTIVITY
exports.getActivity = async (user, id) => {
  // comprobamos que existe esa actividad en la DB
  const activityDb = await activityRepository.findActivityById(id);

  if (!activityDb) throw new Error();

  // comprobamos que esa actividad es del usuario que la solicita
  if (activityDb.UserId !== user.id)
    throw new Error("You don't have permission to watch this activity");

  return activityDb.toJSON();
};

// CREATE ACTIVITY
exports.createActivity = async (activity) => {
  // validamos los datos introducidos
  const activityValidation = await insertActivitySchema.validateAsync(activity);

  if (!activityValidation) throw new Error();

  await activityRepository.insertActivity(activityValidation);
};

// EDIT ACTIVITY
exports.editActivity = async (user, activityDetails, id) => {
  const activityValidation = await activityRepository.findActivityById(id);

  if (!activityValidation) throw new Error();

  // validamos la info introducida sea correcta
  const checkActivity = await updateActivitySchema.validateAsync(
    activityDetails
  );

  if (!checkActivity) throw new Error();

  // comprobar que pertenece al usuario la actividad
  if (activityValidation.UserId !== user.id) throw new Error();

  await activityRepository.updateActivity(activityDetails, id);
};

// DELETE ACTIVITY
exports.removeActivity = async (user, id) => {
  // validar que existe esa actividad
  const activityDb = await activityRepository.findActivityById(id);

  if (!activityDb) throw new Error();

  // comprobar que sea del usuario que lo solicita
  if (activityDb.UserId !== user.id) throw new Error();

  await activityRepository.deleteActivity(activityDb.id);
};
