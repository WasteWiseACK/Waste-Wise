const knex = require('../db/knex');

class Post {
  constructor({ id, title, body, user_id, created_at, username, likedByCurrentUser, tags }) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.user_id = user_id;
    this.created_at = created_at;
    this.username = username;
    this.likedByCurrentUser = likedByCurrentUser;
    this.tags = tags;

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
  static async list(user_id = null) {
    const query = `
    SELECT
      posts.id AS id, 
      posts.title, 
      posts.body, 
      posts.created_at,
      posts.user_id, 
      users.username,
      COALESCE(liked_posts.user_id IS NOT NULL, false) AS likedByCurrentUser,
      json_agg(json_build_object('id', tags.id, 'name', tags.name)) AS tags
    FROM posts
    JOIN users ON posts.user_id = users.id
    LEFT JOIN liked_posts ON liked_posts.post_id = posts.id AND liked_posts.user_id = ?
    LEFT JOIN post_tags ON post_tags.post_id = posts.id
    LEFT JOIN tags ON post_tags.tag_id = tags.id
    GROUP BY posts.id, users.username, liked_posts.user_id
    ORDER BY posts.created_at DESC
  `;
    //     const query = `
    //     SELECT DISTINCT 
    //     posts.id AS id, 
    //     posts.title, 
    //     posts.body, 
    //     posts.created_at,
    //     posts.user_id, 
    //     users.username,
    //     COALESCE(liked_posts.user_id IS NOT NULL, false) AS likedByCurrentUser,
    // FROM posts 
    // JOIN users ON posts.user_id = users.id
    // LEFT JOIN liked_posts ON liked_posts.post_id = posts.id AND liked_posts.user_id = ?
    //   `;

    const result = await knex.raw(query, [user_id]);
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
    const query = `
    SELECT posts.*, users.username
    FROM posts
    JOIN users ON posts.user_id = users.id
    WHERE posts.user_id = ?;
  `;
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

  static async findLikedByUserId(user_id) {
    const query = `
      SELECT posts.id AS id, posts.title, posts.body, posts.user_id, users.username, posts.created_at
      FROM liked_posts
      JOIN posts ON liked_posts.post_id = posts.id
      JOIN users ON posts.user_id = users.id
      WHERE liked_posts.user_id = ?
    `;

    const result = await knex.raw(query, [user_id]);
    return result.rows.map((rawPostData) => new Post(rawPostData));
  }
  static async findByTags(tagArray) {
    const tagPlaceholders = tagArray.map(() => '?').join(', '); // Creates placeholders for the tag array
    const query = `
      SELECT 
          posts.*, 
          users.username,
      json_agg(json_build_object('id', tags.id, 'name', tags.name)) AS tags
      FROM posts
      JOIN post_tags ON posts.id = post_tags.post_id
      JOIN tags ON post_tags.tag_id = tags.id
      JOIN users ON posts.user_id = users.id
      WHERE tags.id IN (${tagPlaceholders})
      GROUP BY posts.id, users.username
      ORDER BY posts.id DESC
    `;

    const posts = await knex.raw(query, tagArray); // Passing the tag array as values for the placeholders

    return posts.rows.map(post => ({
      ...post,
      tags: post.tags ? post.tags.map(tag => ({ id: tag.id, name: tag.name })) : []
    }));
  };


}
module.exports = Post;
