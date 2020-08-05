const connection = require("../db/connection");

exports.getArticleByArticle_id = article_id => {
  return connection
  .first("articles.*")
  .from("articles")
  .count({comment_count: 'comment_id'})
  .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
  .where("articles.article_id", "=", article_id)
  .groupBy("articles.article_id")
};