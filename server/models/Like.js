const knex = require('../db/knex');


class Like {
  constructor({ id, user_id, post_id }) {
    this.id = id;
    this.user_id = user_id;
    this.post_id = post_id;
  }


  static async addLike(post_id, user_id) {
    try {
      const query = `
     INSERT INTO liked_posts
     (post_id, user_id) VALUES(?, ?)
     RETURNING *
     `;
      const result = await knex.raw(query, [post_id, user_id]);
      return result.rows.map((rawLikeData) => new Like(rawLikeData));


    } catch (error) {
      throw new Error(`Unable to add like: ${error.message}`);
    }
  }


  static async deleteLike(post_id, user_id) {
    try {
      const query = `
     DELETE FROM liked_posts
     WHERE post_id = ?
     AND user_id = ?
     RETURNING *
     `;
      const result = await knex.raw(query, [post_id, user_id]);
      return result.rows.map((deleteLikeData) => new Like(deleteLikeData))


    } catch (error) {
      throw new Error(`Unable to delete like: ${error.message}`);
    }
  }


  static async findLike(post_id, user_id) {
    try {
      const query = `
      SELECT * FROM liked_posts
      WHERE post_id = ?
      AND user_id = ?
      `;
      const result = await knex.raw(query, [post_id, user_id]);
      return result.rows.length ? new Like(result.rows[0]) : null; // Return single instance or null
    } catch (error) {
      throw new Error(`Unable to find like: ${error.message}`);
    }
  }
}

module.exports = Like;