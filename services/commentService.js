const commentRepository = require("../repositories/commentRepository");
const {
  insertCommentSchema,
  updateCommentSchema,
} = require("../validations/commentValidation");

// FIND ALL COMMENTS
exports.getAllComments = async () => {
  // en el repositorio filtramos los públicos
  return await commentRepository.findAllComments();
};

// FIND COMMENT BY ID
exports.getComment = async (user, id) => {
  // comprobamos si existe ese comment
  const comment = await commentRepository.findCommentById(id);

  if (!comment) throw new Error();

  return comment.toJSON();
};

// CREATE COMMENT
exports.createComment = async (comment) => {
  const commentValidation = await insertCommentSchema.validateAsync(comment);

  if (!commentValidation) throw new Error();

  await commentRepository.insertComment(comment);
};

// EDIT COMMENT
exports.editComment = async (user, commentDetails, id) => {
  const commentDb = await commentRepository.findCommentById(id);

  if (!commentDb) throw new Error();

  const commentValidation = await updateCommentSchema.validateAsync(
    commentDetails
  );

  if (!commentValidation) throw new Error();

  if (commentDb.UserId !== user.id) throw new Error();

  await commentRepository.updateComment(commentValidation, commentDb.id);
};

// DELETE COMMENT
exports.removeComment = async (user, id) => {
  const comment = await commentRepository.findCommentById(id);

  if (!comment) throw new Error();

  if (user.id !== comment.UserId) throw new Error();

  await commentRepository.deleteComment(comment.id);
};
