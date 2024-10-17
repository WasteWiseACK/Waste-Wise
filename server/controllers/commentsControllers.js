const { isAuthorized } = require('../utils/auth-utils');
const Comment = require('../models/Comments');

exports.createComment = async (req, res) => {
  const { content } = req.body;
  const user_id = req.session.userId;
  const post_id = req.params.post_id || req.body.post_id;
  const comment = await Comment.create(content, user_id, post_id);
  res.send(comment);
}

exports.listComments = async (req, res) => {
  const comments = await Comment.list();
  res.send(comments);
}

exports.editComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const comment = await Comment.find(id);

  if (!comment) {
    return res.status(404).send('Comment not found');
  }

  // Check if the user is authorized to update this post
  if (!isAuthorized(post.user_id, req.session)) {
    return res.status(403).send('Unauthorized');
  }

  const updatedComment = await Comment.edit(id, content);

  if (!updatedComment) {
    return res.status(404).send('Comment not found');
  }

  res.send(updatedComment)

}

exports.deleteComment = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.session

  const comment = await Comment.find(id);

  //if comment is not found it returns this error message
  if (!comment) {
    return res.status(404).send('Comment not found');
  }

  // checks if the comment user is the same as the current user in session.
  if (comment.user_id !== userId) return res.status(403).send('You are not authorized to delete this comment');

  // Delete the comment
  const deleteComment = await Comment.delete(id);

  return res.status(200).send(deleteComment);

}