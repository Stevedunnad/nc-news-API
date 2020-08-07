exports.up = function (knex) {
  return knex.schema.createTable("comments", commentsTable => {
    commentsTable.increments("comment_id").notNullable();
    commentsTable.text("author").references("users.username").notNullable();
    commentsTable.text("body");
    commentsTable.integer("article_id").references("articles.article_id").notNullable();
    commentsTable.timestamp("created_at").defaultTo(knex.fn.now());
    commentsTable.integer("votes").defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};