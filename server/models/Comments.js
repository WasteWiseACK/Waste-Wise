const knex = require('../db/knex');

class Comment {
  constructor(id, post_id, content, user_id, created_at, username) {
    this.id = id;
    this.post_id = post_id;
    this.content = content;
    this.user_id = user_id;
    this.created_at = created_at;
    this.username = username;
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

    const result = await knex('comments')
      .join('users', 'comments.user_id', 'users.id')
      .where('comments.post_id', post_id)
      .select('comments.*', 'users.username');
    return result.map((rawCommentsData) => {
      return new Comment(
        rawCommentsData.id,
        rawCommentsData.post_id,
        rawCommentsData.content,
        rawCommentsData.user_id,
        rawCommentsData.created_at,
        rawCommentsData.username
      );
    });
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