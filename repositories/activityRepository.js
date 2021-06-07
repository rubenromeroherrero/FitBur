const Activity = require("../models/Activity");
const Routine = require("../models/Routine");
const User = require("../models/User");

// FIND ALL
exports.findAllActivities = async () => {
  return await Activity.findAll({
    where: { visibility: ["public"] },
    include: [
      { model: User, attributes: ["name"] },
      { model: Routine, attributes: ["title"] },
    ],
  });
};

// FIND ACTIVITY
exports.findActivityById = async (id) => {
  return await Activity.findByPk(id, {
    include: [
      { model: User, attributes: ["name"] },
      { model: Routine, attributes: ["title"] },
    ],
  });
};

// INSERT
exports.insertActivity = async (activity) => {
  return await Activity.create(activity);
};

// EDIT
exports.updateActivity = async (activityDetails, id) => {
  return await Activity.update(activityDetails, { where: { id } });
};

// DELETE
exports.deleteActivity = async (id) => {
  return await Activity.destroy({ where: { id } });
};
