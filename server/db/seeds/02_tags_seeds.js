/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('tags').del()
  await knex.raw('ALTER SEQUENCE tags_id_seq RESTART WITH 1');
  await knex('tags').insert([
    { name: 'Food Waste' },
    { name: 'Sustainability' },
    { name: 'Community' },
    { name: 'Recycling' },
    { name: 'Charity' },
    { name: 'Questions' }
  ]);
};
