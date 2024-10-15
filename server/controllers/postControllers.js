const Post = require('../models/Post')
const { isAuthorized } = require('../utils/auth-utils')

exports.createPost = async (req, res) => {
  const { title, body } = req.body;

  // Create a new post using the user ID from the session
  const newPost = await Post.create({
    title,
    body,
    user_id: req.session.userId, // Associate the post with the logged-in user
  });

  res.send(newPost)
}

exports.listPosts = async (req, res) => {
  const posts = await Post.list();
  res.send(posts);
};

exports.showPost = async (req, res) => {
  const { id } = req.params;

  const post = await Post.find(id);
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

// exports.deletePost = async (req, res) => {
//   const postId = req.params.id;
//   const userId = req.session.userId; // Use userId


//   const post = await Post.find(postId);
//   if (!post) {
//     return res.status(404).json({ message: 'Post not found' });
//   }

//   // Check if the current user is the author of the post
//   if (post.user_id.toString() !== userId) {
//     return res.status(403).json({ message: 'You are not authorized to delete this post' });
//   }

//   // Delete the post
//   await Post.deleteById(postId);
// }
