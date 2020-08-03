
exports.up = function (knex) {
  console.log("creating topics table");
  return knex.schema.createTable("users", usersTable => {
    usersTable.text("username").primary().notNullable();
    usersTable.text("avatar_url");
    usersTable.string("name");
  })
};

exports.down = function (knex) {
  console.log('"removing users table');
  return knex.schema.dropTable("users");
};
