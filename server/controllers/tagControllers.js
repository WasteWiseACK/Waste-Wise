const { isAuthorized } = require('../utils/auth-utils');
const Tag = require('../models/Tag')


exports.addTag = async (req, res) => {
  const { tag_id } = req.params;

  try {
    const tag = await tag.find()
    if (!tag) return res.status(404).send(`Tag with Id: ${tag_id} does not exist.`)


    const newTag = await Tag.addTag(post_id, tag_id)
    return res.status(201).send(newTag)
  } catch (error) {
    return res.status(500).send({ error: error.message })
  }

}


exports.removeTag = async (req, res) => {

}
