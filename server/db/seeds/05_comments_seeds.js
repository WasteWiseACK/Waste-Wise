/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('comments').del()
  await knex('comments').insert([
    {
      post_id: 1,
      content: 'Exactly! It’s all about being mindful. Small changes add up.',
      user_id: 3

    },
    {
      post_id: 2,
      content: 'Meal planning changed my life! I throw out way less food now.',
      user_id: 1
    },
    {
      post_id: 3,
      content: 'It’s crazy how much good food gets wasted when people are hungry. We need more food sharing programs.',
      user_id: 2
    },
    {
      post_id: 4,
      content: 'Yup, I’ve been giving leftovers to people in need, and it feels great to help out.',
      user_id: 3
    },
    {
      post_id: 5,
      content: 'I always go to the local market now. Food is fresher and I get to meet awesome people!',
      user_id: 1
    }
  ]);
};
