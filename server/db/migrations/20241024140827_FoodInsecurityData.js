/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('Food_Insecurity', function (table) {
    table.increments('id').primary();
    table.string('BORO');
    table.string('ZIP_CODE');
    table.float('count');
    table.float('longitude');
    table.float('latitude');
    table.float('bbl');
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('Food_Insecurity');
};
