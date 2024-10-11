/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('comments', (table) => {
        table.increments('id').primary();
        table.integer('post_id').notNullable();
        table.foreign('post_id').references('id').inTable('posts');
        table.text('content').notNullable();
        table.integer('user_id').notNullable();
        table.foreign('user_id').references('id').inTable('users');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('comments');
};
