const { isAuthorized } = require('../utils/auth-utils');
const Like = require('../models/Like');
const Post = require(`../models/Post`);


exports.createLike = async (req, res) => {
  const { userId } = req.session;
  const { post_id } = req.params;

  try {
    const post = await Post.find(post_id)
    if (!post) return res.status(404).send(`Post with Id: ${post_id} does not exist.`)

    const existingLike = await Like.findLike(post_id, userId)
    if (existingLike) return res.status(409).send("Like already exists.")

    const newLike = await Like.addLike(post_id, userId)
    return res.status(201).send(newLike)
  } catch (error) {
    return res.status(500).send({ error: error.message })
  }

}


exports.removeLike = async (req, res) => {
  const { userId } = req.session;
  const { post_id } = req.params;

  try {
    const existingLike = await Like.findLike(post_id, userId)
    res.send(existingLike)
    if (!existingLike) return res.status(409).send("Like does not exist")

    await Like.deleteLike(post_id, userId);
    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).send({ error: error.message })
  }

}

exports.toggleLike = async (req, res) => {
  const { userId } = req.session;
  const { post_id } = req.params;

  try {
    const post = await Post.find(post_id)
    if (!post) return res.status(404).send(`Post with Id: ${post_id} does not exist.`)

    const existingLike = await Like.findLike(post_id, userId)
    if (existingLike) {
      const removedLike = await Like.deleteLike(post_id, userId);
      return res.status(200).send({ message: 'Post unliked', like: removedLike });
    } else {
      const newLike = await Like.addLike(post_id, userId);
      return res.status(201).send({ message: 'Post liked', like: newLike });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message })
  }

}
