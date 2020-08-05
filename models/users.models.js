const connection = require("../db/connection");

exports.getUserByUsername = username => {
  return connection
  .first("*")
  .from("users")
  .where("username", "=", username)
};