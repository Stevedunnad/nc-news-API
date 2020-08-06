const { getArticleByArticle_id, getUpdatedArticle,getUpdatedComment } = require("../models/articles.models");

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
  const {inc_votes} = req.body;
  console.log('=//=>', inc_votes)
  return getUpdatedArticle(article_id, inc_votes)
  .then(([article]) => {
    res.status(200).send({article});
  })
  .catch(next)
}

const postCommentByArticle_id = (req, res, next) => {
  const {article_id} = req.params;
  const {username, body} = req.body;
  console.log('*-->', article_id)
  console.log('*-->', body)
  return getUpdatedComment(article_id, body, username)
  .then(comment => {
    console.log('++>>', comment)
    res.status(201).send({comment});
  })
  .catch(next)
}

module.exports = {sendArticleByArticle_id, patchArticleByArticle_id, postCommentByArticle_id};