/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('posts', (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.text('body').notNullable();
        table.integer('user_id').notNullable();
        table.foreign('user_id').references('id').inTable('users');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('posts');
};
