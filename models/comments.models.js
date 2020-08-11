const connection = require("../db/connection");

exports.confirmCommentDeleted = (comment_id) => {
  return connection
  .del()
  .from('comments')
  .where('comment_id', '=', comment_id)
};
