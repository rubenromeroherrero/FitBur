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

  // si la persona loggeada quiere acceder a un comentario privado de otra persona lanzamos error
  // en el caso de ser admin le admitimos ver los comments (privados y públicos)
  if (
    comment.UserId !== user.id &&
    comment.visibility !== "public" &&
    user.role !== "admin"
  )
    throw new Error();

  return comment.toJSON();
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
