const commentRepository = require("../repositories/commentRepository");
const {
  insertCommentSchema,
  updateCommentSchema,
} = require("../validations/commentValidation");
const HttpError = require("../util/httpError");

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

  if (!commentDb) throw new HttpError(404, "Comment not found in databases");

  if (
    commentDb.UserId !== user.id &&
    commentDb.visibility !== "public" &&
    user.role !== "admin"
  )
    throw new HttpError(
      401,
      "You can't watch this comment, because it's private. You must logging with correctly account"
    );

  return commentDb.toJSON();
};

// CREATE COMMENT
exports.createComment = async (comment) => {
  const commentValidation = await insertCommentSchema.validateAsync(comment);

  if (!commentValidation)
    throw new HttpError(
      400,
      "You must introduce correctly data to create comment"
    );

  await commentRepository.insertComment(comment);
};

// EDIT COMMENT
exports.editComment = async (user, { id, ...commentDetails }) => {
  const commentDb = await commentRepository.findCommentById(id);

  if (!commentDb) throw new HttpError(404, "Comment not found in databases");

  const commentValidation = await updateCommentSchema.validateAsync(
    commentDetails
  );

  if (commentDb.UserId !== user.id)
    throw new HttpError(
      401,
      "Comment you want to edit isn't yours. Please, you need logging with correct account"
    );

  await commentRepository.updateComment(commentValidation, id);
};

// DELETE COMMENT
exports.removeComment = async (user, id) => {
  const comment = await commentRepository.findCommentById(id);

  if (!comment) throw new HttpError(404, "Comment not found in databases");

  if (user.id !== comment.UserId)
    throw new HttpError(
      401,
      "Comment you want to edit isn't yours. Please, you need logging with correct account"
    );

  await commentRepository.deleteComment(id);
};
