//initialising knex library
const knex = require("knex");
const dbConfig = require("../knexfile");

module.exports = knex(dbConfig);
