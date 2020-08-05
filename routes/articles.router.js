const articlesRouter = require("express").Router();
const { sendArticleByArticle_id } = require("../controllers/articles.controllers");

articlesRouter.get("/:article_id", sendArticleByArticle_id);

module.exports = articlesRouter;