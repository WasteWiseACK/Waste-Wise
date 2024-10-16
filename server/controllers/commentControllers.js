const { isAuthorized } = require('../utils/auth-utils');
const Comment = require('../models/Comment');

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