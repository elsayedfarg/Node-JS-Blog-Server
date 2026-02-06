const commentService = require("../services/commentServices");
const emailService = require("../services/emailServices");
const postService = require("../services/postServices");

const APIError = require("../utils/APIError");
const sendResponse = require("../utils/sendResponse");

const createComment = async (req, res) => {
  const newComment = await commentService.createComment(
    req.body,
    req.user.userId,
  );

  const post = await postService.getPostById(
    newComment.postId,
    req.user.userId,
  );
  const postAuthor = post.userId;
  const commenter = req.user;

  emailService.sendCommentNotification(postAuthor, commenter, post, newComment);

  sendResponse(res, newComment, 201);
};

const getAllComments = async (req, res) => {
  const { comments, pagination } = await commentService.getAllComments(
    req.query,
    req.user.userId,
  );

  sendResponse(res, comments, 200, {
    results: comments.length,
    pagination,
  });
};

const getCommentById = async (req, res) => {
  const comment = await commentService.getCommentById(
    req.params.commentId,
    req.user.userId,
  );

  if (!comment) {
    throw new APIError("Comment not found", 404);
  }

  sendResponse(res, comment);
};

const updateCommentById = async (req, res) => {
  const updatedComment = await commentService.updateCommentById(
    req.params.commentId,
    req.body,
    req.user.userId,
  );

  if (!updatedComment) {
    throw new APIError("Comment not found", 404);
  }

  sendResponse(res, updatedComment);
};

const deleteCommentById = async (req, res) => {
  const deletedComment = await commentService.deleteCommentById(
    req.params.commentId,
    req.user.userId,
  );

  if (!deletedComment) {
    throw new APIError("Comment not found", 404);
  }

  res.status(200).json({
    status: "success",
    message: "Comment deleted successfully",
  });
};

const getCommentsByPost = async (req, res) => {
  const comments = await commentService.getCommentsByPost(
    req.params.postId,
    req.user.userId,
  );

  sendResponse(res, comments, 200, {
    results: comments.length,
  });
};

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
  getCommentsByPost,
};
