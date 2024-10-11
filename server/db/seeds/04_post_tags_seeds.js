/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('post_tags').del()
  await knex.raw('ALTER SEQUENCE post_tags_id_seq RESTART WITH 1');
  await knex('post_tags').insert([
    { post_id: 1, tag_id: 1 },
    { post_id: 1, tag_id: 2 },
    { post_id: 2, tag_id: 1 },
    { post_id: 2, tag_id: 5 },
    { post_id: 3, tag_id: 3 },
    { post_id: 4, tag_id: 4 },
    { post_id: 5, tag_id: 2 },
    { post_id: 5, tag_id: 1 },
  ]);
};
