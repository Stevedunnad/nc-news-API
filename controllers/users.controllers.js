const { getUserByUsername } = require("../models/users.models");

sendUserByUsername = (req, res, next) => {
  const {username} = req.params;
  console.log('-*->', username)
  getUserByUsername(username)
  .then(user => {
    console.log('->>', user)
  res.status(200).send({user});
  })
  .catch(next)
};

module.exports = {sendUserByUsername};