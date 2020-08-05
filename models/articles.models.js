const connection = require("../db/connection");

exports.getArticleByArticle_id = article_id => {
  return connection
  .first("articles.*")
  .from("articles")
  .where("articles.article_id", "=", article_id)
  .count({comment_count: 'comment_id'})
  .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
  .groupBy("articles.article_id")
  .then(response => {
    if(response === undefined) {
      return Promise.reject({status: 404, msg: 'artcicle_id does not exist!'});
    } else {
      return response;
    }
  })
};

exports.getUpdatedArticle = article_id => {
  return connection
  .first('*')
  .from('articles')
  .where('article_id', '=', article_id)
  .increment('vote', 1)
  .returning('*')
}