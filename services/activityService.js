const activityRepository = require("../repositories/activityRepository");
const {
  insertActivitySchema,
  updateActivitySchema,
} = require("../validations/activityValidations");
const HttpError = require("../util/httpError");

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

  if (!activityDb) throw new HttpError(404, "Activity not found");

  if (
    activityDb.UserId !== user.id &&
    activityDb.visibility !== "public" &&
    user.role !== "admin"
  )
    throw new HttpError(
      401,
      "You can't watch this activity, because it's private. You must logging with correctly account"
    );

  return activityDb.toJSON();
};

// CREATE ACTIVITY
exports.createActivity = async (activity) => {
  // validamos los datos introducidos
  const activityValidation = await insertActivitySchema.validateAsync(activity);

  await activityRepository.insertActivity(activityValidation);
};

// EDIT ACTIVITY
exports.editActivity = async (user, { id, ...activityDetails }) => {
  const activityValidation = await activityRepository.findActivityById(id);

  if (!activityValidation) throw new HttpError(404, "Activity not found");

  // validamos la info introducida sea correcta
  const checkActivity = await updateActivitySchema.validateAsync(
    activityDetails
  );

  // comprobar que pertenece al usuario la actividad
  if (activityValidation.UserId !== user.id)
    throw new HttpError(401, "Please, you need logging with correct account");

  await activityRepository.updateActivity(id, checkActivity);
};

// DELETE ACTIVITY
exports.removeActivity = async (user, id) => {
  // validar que existe esa actividad
  const activityDb = await activityRepository.findActivityById(id);

  if (!activityDb) throw new HttpError(404, "Activity not found");

  // comprobar que sea del usuario que lo solicita
  if (activityDb.UserId !== user.id)
    throw new HttpError(401, "Please, you need logging with correct account");

  await activityRepository.deleteActivity(activityDb.id);
};
