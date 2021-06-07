const Comment = require("../models/Comment");
const Routine = require("../models/Routine");
const User = require("../models/User");

// FIND ALL COMMENTS
exports.findAllComments = async () => {
  return await Comment.findAll({
    // así sólo puede verlo el usuario que lo crea o el admin

    include: [{ model: User, attributes: ["name"] }, { model: Routine }],
  });
};

// FIND ONE COMMENT
exports.findCommentById = async (id) => {
  return await Comment.findByPk(id, {
    include: [{ model: User, attributes: ["name"] }, { model: Routine }],
  });
};

// CREATE COMMENT
exports.insertComment = async (comment) => {
  return await Comment.create(comment);
};

// EDIT COMMENT
exports.updateComment = async (commentDetails, id) => {
  return await Comment.update(commentDetails, { where: { id } });
};

// DELETE COMMENT
exports.deleteComment = async (id) => {
  return await Comment.destroy({ where: { id } });
};
