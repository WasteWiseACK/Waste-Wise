const { isAuthorized } = require('../utils/auth-utils');
const Comment = require('../models/Comments');

exports.createComment = async (req, res) => {
  const { content, postId } = req.body;
  const user_id = req.session.userId;


  const comment = await Comment.create(postId, content, user_id);
  res.send(comment);
}

exports.listAllComments = async (req, res) => {
  const comments = await Comment.list();
  res.send(comments);
}

exports.listComments = async (req, res) => {
  const { postId } = req.body;
  const comments = await Comment.listByPostId(postId);
  res.send(comments)
}

exports.editComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;


  const comment = await Comment.find(id);
  // res.send(comment.id.user_id)
  // Check if the user is authorized to update this comment
  if (!isAuthorized(comment.id.user_id, req.session)) {
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

  const comment = await Comment.find(id);

  //if comment is not found it returns this error message
  if (!comment) {
    return res.status(404).send('Comment not found');
  }

  // checks if the comment user is the same as the current user in session
  if (!isAuthorized(comment.id.user_id, req.session)) {
    return res.status(403).send('Unauthorized');
  }

  // Delete the comment
  const deleteComment = await Comment.delete(id);

  return res.status(200).send(deleteComment);

}