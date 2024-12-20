const Post = require('../models/Post')
const Tag = require('../models/Tag');
const { isAuthorized } = require('../utils/auth-utils')

exports.createPost = async (req, res) => {
  const { title, body, tags } = req.body;

  // Create a new post using the user ID from the session
  const newPost = await Post.create({
    title,
    body,
    user_id: req.session.userId,
  });
  if (tags && tags.length > 0) {
    await Promise.all(
      tags.map(tagId => Tag.addTag(post.id, tagId))
    );
  }

  res.send(newPost)
}

exports.listPosts = async (req, res) => {
  console.log("User from request:", req.session.userId); // Log the user object
  const user_id = req.session.userId || null;
  const posts = await Post.list(user_id);
  console.log("Posts to return:", posts); // Check the output here
  res.send(posts);
};

exports.showPost = async (req, res) => {
  const { id } = req.params;

  const post = await Post.find(id);
  if (!post) return res.sendStatus(404);

  res.send(post)
}

exports.findByUserId = async (req, res) => {
  const { userId } = req.params;

  const post = await Post.findByUserId(userId);
  if (!post) return res.sendStatus(404);

  res.send(post)
}

exports.updatePost = async (req, res) => {
  const { id } = req.params; // Get post ID from URL parameters
  const { title, body } = req.body; // Get new title and body from request body

  const post = await Post.find(id);
  if (!post) {
    return res.status(404).send('Post not found');
  }

  // Check if the user is authorized to update this post
  if (!isAuthorized(post.user_id, req.session)) {
    return res.status(403).send('Unauthorized');
  }

  const updatedPost = await Post.update(id, title, body);

  if (!updatedPost) {
    return res.status(404).send('Post not found');
  }

  res.send(updatedPost)

}

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.session

  const post = await Post.find(id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  // checks if the post user is the same as the current user in session.
  if (post.user_id !== userId) return res.status(403).send('You are not authorized to delete this post');

  // Delete the post
  const deletePost = await Post.deleteById(id);

  return res.status(200).send(deletePost);

}

exports.getLikedPosts = async (req, res) => {
  const { userId } = req.session;

  try {
    // Fetch liked posts for the current user
    const likedPosts = await Post.findLikedByUserId(userId);

    // If no liked posts, send an empty array
    if (likedPosts.length === 0) {
      return res.status(200).send([]);
    }

    // Send the liked posts as the response
    return res.status(200).send(likedPosts);
  } catch (error) {

    return res.status(500).send({ error: error.message });
  }
};

exports.getPostsByTags = async (req, res) => {
  const tags = req.query.tags; // Get tags from the query parameters

  if (!tags) {
    return res.status(400).send({ message: 'Tags are required' });
  }

  // Split the tags into an array
  const tagArray = tags.split(',');

  try {
    // Fetch posts that have any of the specified tags
    const posts = await Post.findByTags(tagArray); // Assuming you have this method in your Post model

    // If no posts found, send an empty array
    if (posts.length === 0) {
      return res.status(200).send([]);
    }

    // Send the found posts as the response
    return res.status(200).send(posts);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

