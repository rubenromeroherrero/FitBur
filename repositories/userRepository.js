// conexion con la DB
const User = require("../models/User");

// FIND
exports.findAllUsers = async () => {
  return await User.findAll();
};

exports.findUserById = async (id) => {
  return await User.findByPk(id);
};

exports.findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

exports.findUserWithPasswordByEmail = async (email) => {
  return await User.scope("withPassword").findOne({ where: { email } });
};

exports.findUserByNickname = async (nickname) => {
  return await User.findOne({ where: { nickname } });
};

// INSERT
exports.insertUser = async (user) => {
  return await User.create(user);
};

// EDIT
exports.updateUser = async (id, userDetails) => {
  return await User.update(userDetails, { where: { id } });
};

// DELETE
exports.deleteUser = async (id) => {
  return await User.destroy({ where: { id } });
};
