const knex = require('../db/knex');

class Post {
  constructor({ id, title, body, user_id, username }) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.user_id = user_id;
    this.username = username;

  }

  // This function validates whether a 
  //title and body values are being inputted to create a post!
  validate() {
    if (!this.title || !this.body) {
      throw new Error("Title and body are required.");
    }
    if (typeof this.title !== 'string' || typeof this.body !== 'string') {
      throw new Error("Title and body must be strings.");
    }
  }


  //Fetches ALL posts from the post table
  static async list() {
    const query = `
    SELECT DISTINCT 
  posts.id AS id, 
  posts.title, 
  posts.body, 
  posts.user_id, 
  users.username
FROM posts 
JOIN users ON posts.user_id = users.id
  `;

    const result = await knex.raw(query);
    return result.rows.map((rawPostData) => new Post(rawPostData));
  }


  // Fetches a single post from posts table that matches the given id.
  //If it finds post, it will format the post and return it if available.
  static async find(id) {
    const query = `SELECT * FROM posts WHERE id = ? `;
    const result = await knex.raw(query, [id]);
    const rawUserData = result.rows[0];
    return rawUserData ? new Post(rawUserData) : null;
  }


  // Similar to the one above , it will return post or posts from posts table
  // Based on user_id;
  static async findByUserId(user_id) {
    const query = `SELECT * FROM posts WHERE user_id = ? `;
    const result = await knex.raw(query, [user_id]);
    const rawUserData = result.rows; // Get all rows
    return rawUserData.length > 0 ? rawUserData : null;
  }

  //Creates a single post from the post table
  static async create({ title, body, user_id }) {
    const post = new Post({ title, body, user_id });
    post.validate(); // Validate the post before saving

    const query = `
      INSERT INTO posts(title, body, user_id)
    VALUES(?, ?, ?)
    RETURNING *
      `;
    const result = await knex.raw(query, [post.title, post.body, post.user_id]);
    const rawPostData = result.rows[0]; // the newly created post
    return new Post(rawPostData);
  }

  //Updates a post that matches the given id with a new title and body
  //return the modified post using the constructor
  static async update(id, title, body) {
    const query = `
      UPDATE posts
      SET title = ?, body = ?
      WHERE id = ?
        RETURNING *
        `;
    const result = await knex.raw(query, [title, body, id])
    const rawUpdatedPost = result.rows[0];
    return rawUpdatedPost ? new Post(rawUpdatedPost) : null;
  }

  static async deleteById(id) {
    const query = `
      DELETE FROM posts 
      WHERE id = ?
      RETURNING *
      `
      ;
    const result = await knex.raw(query, [id]);
    return result.rows[0] ? new Post(result.rows[0]) : null;
  }

  static async deleteAll() {
    return knex('posts').del()
  }

}


module.exports = Post;
