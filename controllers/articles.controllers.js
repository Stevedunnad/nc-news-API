const { getArticleByArticle_id, getUpdatedArticle } = require("../models/articles.models");

const sendArticleByArticle_id = (req, res, next) => {
  const {article_id} = req.params;
  return getArticleByArticle_id(article_id)
  .then(article => {
  res.status(200).send({article});
  })
  .catch(next)
};

const patchArticleByArticle_id = (req, res, next) => {
  const {article_id} = req.params;
  console.log('-->', article_id)
  return getUpdatedArticle(article_id)
  .then(updatedArticle => {
    console.log('++>>', updatedArticle)
    res.status(201).send({updatedArticle});
  })
  .catch(next)
}

module.exports = {sendArticleByArticle_id, patchArticleByArticle_id};