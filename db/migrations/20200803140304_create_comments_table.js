exports.up = function (knex) {
  console.log("creating comments table");
  return knex.schema.createTable("comments", commentsTable => {
    commentsTable.increments("comment_id").notNullable();
    commentsTable.text("author").references("users.username");
    commentsTable.text("body");
    commentsTable.integer("article_id").references("articles.article_id");
    commentsTable.timestamp("created_at").defaultTo(knex.fn.now());
    commentsTable.integer("votes");
  });
};

exports.down = function (knex) {
  console.log("removing comments table");
  return knex.schema.dropTable("comments");
};