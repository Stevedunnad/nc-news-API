const connection = require("../db/connection");

exports.confirmCommentDeleted = () => {
  return connection.select("*").from("comments");
};
