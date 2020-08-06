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
      return Promise.reject({status: 404, msg: 'article_id does not exist!'});
    } else {
      return response;
    }
  })
};

exports.getUpdatedArticle = (article_id, inc_votes=0) => {
  return connection
  .from('articles')
  .where('article_id', '=', article_id)
  .increment('votes', inc_votes)
  .returning('*')
  .then(response => {
    if(response === undefined) {
      return Promise.reject({status: 404, msg: 'article_id does not exist!'});
    } else {
      return response;
    }
  })
}

exports.getUpdatedComment = (article_id, body, author) => {
  return connection('comments')
  .insert({body, author, article_id})
  .returning('*')
  .then((comments) => {
    return comments[0]
  })
}