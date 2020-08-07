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
    if(comments === undefined) {
      return Promise.reject({status: 400, msg: 'bad request!'})
    } else {
      return comments[0]
    }
  })
}

//how can i use the sort_query in my knex query?
exports.getCommmentByArticleId = (article_id, sort_by) => {
  console.log('SORT Q===>', sort_by)
  return connection('comments')
  .select('*')
  .from('comments')
  .where("comments.article_id", "=", article_id)
  .orderBy(sort_by, 'desc')
  .then(response => {
    console.log('RES=>', response) //logs empty array - but it might mean there are no comments - how can I use Promise.all() to check db?
    if(response === undefined) {
      return Promise.reject({status: 404, msg: 'article_id does not exist!'});
    } else {
      return response;
    }
  })
}