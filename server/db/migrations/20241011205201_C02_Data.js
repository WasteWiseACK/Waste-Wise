/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('emissions', function (table) {
    table.increments('id').primary();
    table.float('TotalEmissions');
    table.float('TransportationTotalEmissions');
    table.float('HousingTotalEmissions');
    table.float('FoodTotalEmissions');
    table.float('GoodsTotalEmissions');
    table.float('ServicesTotalEmissions');
    table.string('CensusTract');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('emissions');
};
