const { getUserByUsername } = require("../models/users.models");

sendUserByUsername = (req, res, next) => {
  const {username} = req.params;
  getUserByUsername(username)
  .then(user => {
  res.status(200).send({user});
  })
  .catch(next)
};

module.exports = {sendUserByUsername};