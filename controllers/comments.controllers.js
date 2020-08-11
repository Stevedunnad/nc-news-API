const { confirmCommentDeleted } = require("../models/comments.models");

deleteCommentByComment_id = (req, res, next) => {
  const {comment_id} = req.params;
  console.log('comment_id->', comment_id)
  confirmCommentDeleted(comment_id)
  .then(comment => {
    console.log('is there a comment???', comment) //why is the comment coming back - it no longer shows in the db!?
  res.status(204).send({ comment });
  })
  .catch(next)
};

module.exports = {deleteCommentByComment_id};