const Comment = require("../models/Comment");
const Routine = require("../models/Routine");
const User = require("../models/User");

// FIND ALL COMMENTS
exports.findAllComments = async () => {
  return await Comment.findAll({
    where: { visibility: ["public"] },

    include: { model: Routine },
  });
};

// FIND ONE COMMENT
exports.findCommentById = async (id) => {
  return await Comment.findByPk(id);
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
