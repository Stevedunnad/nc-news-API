const articlesRouter = require("express").Router();
const { sendArticleByArticle_id, patchArticleByArticle_id, postCommentByArticle_id, sendCommentsByArticle_id } = require("../controllers/articles.controllers");

articlesRouter
.route("/:article_id")
.get(sendArticleByArticle_id)
.patch(patchArticleByArticle_id);

articlesRouter 
.route("/:article_id/comments")
.post(postCommentByArticle_id)
.get(sendCommentsByArticle_id);

module.exports = articlesRouter;