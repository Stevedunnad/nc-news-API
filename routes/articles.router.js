const articlesRouter = require("express").Router();
const { sendArticleByArticle_id } = require("../controllers/articles.controllers");

articlesRouter.get("/:username", sendArticleByArticle_id);

module.exports = articlesRouter;