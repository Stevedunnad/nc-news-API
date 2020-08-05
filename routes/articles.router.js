const articlesRouter = require("express").Router();
const { sendArticleByArticle_id, patchArticleByArticle_id } = require("../controllers/articles.controllers");

articlesRouter.get("/:article_id", sendArticleByArticle_id);
articlesRouter.patch("/:article_id", patchArticleByArticle_id);

module.exports = articlesRouter;