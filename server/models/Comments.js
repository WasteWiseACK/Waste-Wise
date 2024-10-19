const knex = require('../db/knex');

class Comment {
  constructor(id, post_id, content, user_id) {
    this.id = id;
    this.post_id = post_id;
    this.content = content;
    this.user_id = user_id;
  };
  static async list() {
    const result = await knex('comments');
    return result.map((rawCommentsData) => new Comment(rawCommentsData));
  };

  static async listByPostId(post_id) {
    // Ensure postId is defined
    if (!post_id) {
      throw new Error('postId must be provided');
    }

    const result = await knex('comments').where('post_id', post_id); // Fetch comments directly using Knex

    return result.map((rawCommentsData) => new Comment(rawCommentsData)); //maps the result
  }

  static async find(id) {
    const query = `SELECT * FROM comments WHERE id = ?`;
    const result = await knex.raw(query, [id]);
    const rawCommentData = result.rows[0];
    return rawCommentData ? new Comment(rawCommentData) : null;
  }


  static async create(post_id, content, user_id) {

    const query = `
    INSERT INTO comments (post_id, content, user_id)
    VALUES (?, ?, ?) RETURNING *`;

    const result = await knex.raw(query, [post_id, content, user_id]);


    // Access the returned comment data
    const rawCommentData = result[0];
    return new Comment(rawCommentData);

  };
  static async edit(id, content) {
    const query = `
        UPDATE comments
        SET 
        content = ?
        WHERE id = ?
        RETURNING *`;
    const result = await knex.raw(query, [content, id]);
    const rawUpdatedComment = result.rows[0];
    return rawUpdatedComment ? new Comment(rawUpdatedComment) : null;
  };
  static async delete(id) {
    const query = `
        DELETE FROM comments
        WHERE id = ?
        RETURNING *`;
    const result = await knex.raw(query, [id]);
    const rawCommentData = result.rows[0];
    return rawCommentData ? new Comment(rawCommentData) : null;
  };
};

module.exports = Comment;