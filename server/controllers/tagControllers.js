const Tag = require('../models/Tag');

exports.addTag = async (req, res) => {
  const { post_id } = req.params;
  const { tag_id } = req.body; // Ensure you're getting the tag_id from the request body

  try {
    const existingTags = await Tag.listByPostId(post_id);
    if (!existingTags) return res.status(404).send(`Post with Id: ${post_id} does not exist.`);

    const newTag = await Tag.addTag(post_id, tag_id);
    return res.status(201).send(newTag);
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
