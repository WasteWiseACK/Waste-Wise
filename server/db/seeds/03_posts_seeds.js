/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex.raw('ALTER SEQUENCE posts_id_seq RESTART WITH 1');
  await knex('posts').insert([
    {
      title: 'Composting Without the Headache',
      body: 'Okay, composting sounds complicated, right? But it’s seriously not. Just toss your food scraps and yard junk in a pile or a bin, and boom – magic dirt. Your plants are gonna LOVE it, trust me!',
      user_id: 1,
    },
    {
      title: 'Ways to Reduce Food Waste at Home',
      body: 'You don’t need to throw away perfectly good food! Plan your meals, save leftovers, and donate extras if you can. There are folks who’d love a meal, so don’t let your food go to waste when it could feed someone else.',
      user_id: 2,
    },
    {
      title: 'Why Are We Throwing Food Away When People Are Hungry?',
      body: 'It’s wild how much food gets wasted while there are people who can’t even find their next meal. We need to rethink how we handle food – share it, donate it, do anything but let it hit the trash when it’s still good!',
      user_id: 3,
    },
    {
      title: 'Leftovers Are Life-Savers (Literally)',
      body: 'Ever thought about how your leftovers could be a meal for someone who really needs it? Before you toss that extra pizza slice or half-eaten sandwich, think about giving it to someone who’s been looking for a meal.',
      user_id: 1,
    },
    {
      title: 'Shop Local, Feel Good!',
      body: 'If you’re not hitting up local farmers’ markets, you’re missing out. The food is fresher, tastes better, and you’re helping small businesses. Plus, you’re cutting down on those long food truck trips. Total win!',
      user_id: 2,
    }
  ]);
};
