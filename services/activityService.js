const activityRepository = require("../repositories/activityRepository");
const {
  insertActivitySchema,
  updateActivitySchema,
} = require("../validations/activityValidations");

// GET ALL ACTIVITIES
exports.getAllActivities = async (user) => {
  // filtro ADMIN (public,private) USER(public)
  const filter = user?.role === "user";
  return await activityRepository.findAllActivities(filter);
};

// GET ACTIVITY
exports.getActivity = async (user, id) => {
  // comprobamos que existe esa actividad en la DB
  const activityDb = await activityRepository.findActivityById(id);

  if (!activityDb) throw new Error();

  if (
    activityDb.UserId !== user.id &&
    activityDb.visibility !== "public" &&
    user.role !== "admin"
  )
    throw new Error("aaa");

  // // comprobamos que esa actividad es del usuario que la solicita
  // if (activityDb.UserId !== user.id)
  //   throw new Error("You don't have permission to watch this activity");

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
exports.editActivity = async (user, { id, ...activityDetails }) => {
  const activityValidation = await activityRepository.findActivityById(id);

  if (!activityValidation) throw new Error();

  // validamos la info introducida sea correcta
  const checkActivity = await updateActivitySchema.validateAsync(
    activityDetails
  );

  // comprobar que pertenece al usuario la actividad
  if (activityValidation.UserId !== user.id) throw new Error();

  await activityRepository.updateActivity(id, checkActivity);
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
