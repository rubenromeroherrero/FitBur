const Activity = require("../models/Activity");
const Routine = require("../models/Routine");
const User = require("../models/User");

// FIND ALL
exports.findAllActivities = async (filter) => {
  const where = filter ? { visibility: "public" } : {};
  return await Activity.findAll({
    where,
    include: [
      { model: User, attributes: ["name"] },
      {
        model: Routine,
        attributes: [
          "title",
          "description",
          "duration",
          "date",
          "distance",
          "visibility",
        ],
      },
    ],
  });
};

// FIND ACTIVITY
exports.findActivityById = async (id) => {
  return await Activity.findByPk(id, {
    include: [
      { model: User, attributes: ["name"] },
      {
        model: Routine,
        attributes: [
          "title",
          "description",
          "duration",
          "date",
          "distance",
          "visibility",
        ],
      },
    ],
  });
};

// INSERT
exports.insertActivity = async (activity) => {
  return await Activity.create(activity);
};

// EDIT
exports.updateActivity = async (id, activityDetails) => {
  return await Activity.update(activityDetails, { where: { id } });
};

// DELETE
exports.deleteActivity = async (id) => {
  return await Activity.destroy({ where: { id } });
};
