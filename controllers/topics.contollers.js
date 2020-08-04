const { getAllTopics } = require("../models/topics.models");

sendAllTopics = (req, res) => {
  getAllTopics().then(topics => {
    res.status(200).send({ topics });
  });
};

module.exports = {sendAllTopics};