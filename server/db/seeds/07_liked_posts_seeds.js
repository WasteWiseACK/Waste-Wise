/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('liked_posts').del()
  await knex.raw('ALTER SEQUENCE liked_posts_id_seq RESTART WITH 1');
  await knex('liked_posts').insert([
    { post_id: 1, user_id: 1 },
    { post_id: 1, user_id: 2 },
    { post_id: 2, user_id: 1 },
    { post_id: 2, user_id: 3 },
    { post_id: 3, user_id: 3 },
    { post_id: 4, user_id: 1 },
    { post_id: 5, user_id: 2 },
    { post_id: 5, user_id: 1 },
  ]);
};
