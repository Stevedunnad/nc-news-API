const { confirmCommentDeleted } = require("../models/comments.models");

deleteCommentByComment_id = (req, res) => {
  confirmCommentDeleted(comment_id)
  .then(comments => {
  res.status(204).send({ comments });
  })
  .catch(err => {
    next(err)
  })
};

module.exports = {deleteCommentByComment_id};