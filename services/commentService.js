const commentRepository = require("../repositories/commentRepository");
const {
  insertCommentSchema,
  updateCommentSchema,
} = require("../validations/commentValidation");

// FIND ALL COMMENTS
exports.getAllComments = async (user) => {
  const filter = user?.role === "user";
  // en el repositorio filtramos los públicos
  return await commentRepository.findAllComments(filter);
};

// FIND COMMENT BY ID
exports.getComment = async (user, id) => {
  // comprobamos si existe ese comment
  const commentDb = await commentRepository.findCommentById(id);

  if (!commentDb) throw new Error();

  if (
    commentDb.UserId !== user.id &&
    commentDb.visibility !== "public" &&
    user.role !== "admin"
  )
    throw new Error(
      "You can't watch this routine, because it's private. You must logging with correctly account"
    );

  return commentDb.toJSON();
};

// CREATE COMMENT
exports.createComment = async (comment) => {
  const commentValidation = await insertCommentSchema.validateAsync(comment);

  if (!commentValidation) throw new Error();

  await commentRepository.insertComment(comment);
};

// EDIT COMMENT
exports.editComment = async (user, { id, ...commentDetails }) => {
  const commentDb = await commentRepository.findCommentById(id);

  if (!commentDb) throw new Error();

  const commentValidation = await updateCommentSchema.validateAsync(
    commentDetails
  );

  if (commentDb.UserId !== user.id) throw new Error();

  await commentRepository.updateComment(commentValidation, id);
};

// DELETE COMMENT
exports.removeComment = async (user, id) => {
  const comment = await commentRepository.findCommentById(id);

  if (!comment) throw new Error();

  if (user.id !== comment.UserId) throw new Error();

  await commentRepository.deleteComment(id);
};
