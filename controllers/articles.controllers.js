const { getArticleByArticle_id } = require("../models/articles.models");

sendArticleByArticle_id = (req, res, next) => {
  const {article_id} = req.params;
  getArticleByArticle_id(article_id)
  .then(article => {
    console.log('<*>', article)
  res.status(200).send({article});
  })
  .catch(next)
};

module.exports = {sendArticleByArticle_id};