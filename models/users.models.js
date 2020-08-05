const connection = require("../db/connection");

exports.getUserByUsername = username => {
  return connection
  .first("*")
  .from("users")
  .where("username", "=", username)
  .then(response => {
    if(response === undefined) {
      return Promise.reject({status: 404, msg: 'username does not exist!'});
    } else {
      return response;
    }
  })
};