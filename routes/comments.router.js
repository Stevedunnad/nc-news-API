const articlesRouter = require("express").Router();
const { deleteCommentByComment_id } = require("../controllers/comments.controllers");

articlesRouter.delete("/:comment_id", deleteCommentByComment_id);


module.exports = commentsRouter;