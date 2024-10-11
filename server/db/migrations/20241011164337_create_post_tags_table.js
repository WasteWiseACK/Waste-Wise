/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('post_tags', (table) => {
        table.increments('id').primary();
        table.integer('post_id').notNullable();
        table.foreign('post_id').references('id').inTable('posts');
        table.integer('tag_id').notNullable();
        table.foreign('tag_id').references('id').inTable('tags');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('post_tags');

};
