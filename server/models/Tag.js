const knex = require('../db/knex');

class Tag {
  constructor({ id, post_id, tag_id }) {
    this.id = id;
    this.post_id = post_id;
    this.tag_id = tag_id;
  }

  // List all tags based on post_id of post_tags
  static async listByPostId(post_id) {
    const query = `
    SELECT * FROM post_tags
    WHERE post_id = ?
  `;

    try {
      const result = await knex.raw(query, [post_id]);

      // Check if any results were returned
      if (!result[0] || result[0].length === 0) {
        return []; // Return an empty array if no tags are found
      }

      return result[0].map(tagData => new Tag(tagData)); // Map the result to Tag instances
    } catch (error) {
      console.error('Error fetching tags by post ID:', error);
      throw new Error('Could not retrieve tags.'); // Re-throw or handle the error as needed
    }
  }


  // Find based on id of post_tags
  static async find(id) {
    const query = `
    SELECT * FROM post_tags
    WHERE id = ? 
    `;

    const result = await knex.raw(query, [id]);
    return result[0] ? new Tag(result[0]) : null;
  }

  static async addTag(post_id, tag_id) {
    const query = `
      INSERT INTO post_tags (post_id, tag_id) 
      VALUES (?, ?)
      RETURNING *
    `;

    const result = await knex.raw(query, [post_id, tag_id]);
    return result[0] ? new Tag(result[0]) : null; // Ensure you return a Tag instance if successful
  }

  // Delete post_tags
  static async deleteTag(id) {
    const query = `
      DELETE FROM post_tags
      WHERE id = ?
      RETURNING *
    `;

    const result = await knex.raw(query, [id]);
    return result[0] ? new Tag(result[0]) : null; // Check if there was a result
  }
}

module.exports = Tag;