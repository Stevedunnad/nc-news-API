const { getArticleByArticle_id, getUpdatedArticle, getUpdatedComment, getCommmentByArticleId } = require("../models/articles.models");

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
  return getUpdatedArticle(article_id, inc_votes)
  .then(([article]) => {
    res.status(200).send({article});
  })
  .catch(next)
}

const postCommentByArticle_id = (req, res, next) => {
  const {article_id} = req.params;
  const {username, body} = req.body;
  return getUpdatedComment(article_id, body, username)
  .then(comment => {
    res.status(201).send({comment});
  })
  .catch(next)
}

const sendCommentByArticle_id = (req, res ,next) => {
  const {article_id} = req.params;
  const {sort_by} = req.query;
  console.log('SQ', req.query)
  return getCommmentByArticleId(article_id, sort_by)
  .then((comments)=> {
    res.status(200).send({comments})
  })
  .catch(next)
}

module.exports = {sendArticleByArticle_id, patchArticleByArticle_id, postCommentByArticle_id, sendCommentByArticle_id};