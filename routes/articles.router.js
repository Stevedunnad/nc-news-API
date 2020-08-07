const articlesRouter = require("express").Router();
const { sendArticleByArticle_id, patchArticleByArticle_id, postCommentByArticle_id, sendCommentByArticle_id } = require("../controllers/articles.controllers");

articlesRouter.get("/:article_id", sendArticleByArticle_id);
articlesRouter.patch("/:article_id", patchArticleByArticle_id);
articlesRouter.post("/:article_id/comments", postCommentByArticle_id);
articlesRouter.get("/:article_id/comments", sendCommentByArticle_id);

module.exports = articlesRouter;