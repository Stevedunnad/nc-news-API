const commentsRouter = require("express").Router();
const { deleteCommentByComment_id } = require("../controllers/comments.controllers");

commentsRouter
.delete("/:comment_id", deleteCommentByComment_id);


module.exports = commentsRouter;