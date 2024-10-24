const Tag = require('../models/Tag');
const knex = require('../db/knex');
exports.addTag = async (req, res) => {
  const { post_id } = req.params;
  const { tags } = req.body; // Ensure you're getting the tag_id from the request body

  try {
    const existingTags = await Tag.listByPostId(post_id);
    if (!existingTags) return res.status(404).send(`Post with Id: ${post_id} does not exist.`);
    for (const tagId of tags) {
      await knex('post_tags').insert({ post_id, tag_id: tagId });
    }
    return res.status(201).send({ message: "Tags added successfully." });
  } catch (error) {
    console.error("Error in addTag:", error); // Log the error for debugging
    return res.status(500).send({ error: error.message });
  }
}

exports.removeTag = async (req, res) => {
  const { id } = req.params;

  console.log('Attempting to delete tag with ID:', id); // Log the ID


  try {
    const deletedTag = await Tag.deleteTag(id);
    if (!deletedTag) {
      return res.status(404).send(`Tag with Id: ${id} does not exist.`);
    }
    return res.status(200).send({ message: 'Tag deleted successfully', deletedTag });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
