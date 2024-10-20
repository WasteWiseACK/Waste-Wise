class Tag {
  constructor({ id, post_id, tag_id }) {
    this.id = id;
    this.post_id = post_id;
    this.tag_id = tag_id;
  }

  //list all tags based on post_id of post_tags;
  static async listByPostId(post_id) {
    const query = `
    SELECT * FROM post_tags
    WHERE post_id = ?
    `;

    const result = await knex.raw(query, [post_id]);
    const rawTagData = result[0];
    return new Tag(rawTagData)
  }

  // find based on id of post_tags;
  static async find(id) {
    const query = `
    SELECT * FROM post_tags
    WHERE id = ? 
    `;

    const result = await knex.raw(query, [id]);
    const rawTagData = result[0];
    return new Tag(rawTagData);
  }

  // creates post_tags
  static async create(id, post_id, tag_id) {
    const query = `
      INSERT INTO post_tags (id, post_id, tag_id) 
      VALUES (?, ?, ?)
      RETURNING *
    `;

    const result = await knex.raw(query, [id, post_id, tag_id]);
    const newTagData = result[0];
    return new Tag(newTagData);
  }

  //deleted post_tags 
  static async delete(id) {
    const query = `
    DELETE FROM post_tags
    WHERE id = ?
    RETURNING * 
    `
    const result = await knex.raw(query, [id]);
    const deleteData = result[0];
    return deleteData ? new Tag(deleteData) : null
  }

}