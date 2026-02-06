const Comment = require("../models/commentModel");
const APIError = require("../utils/APIError");
const notificationService = require("./notificationServices");
const Post = require("../models/postModel");

const createComment = async (commentData, userId) => {
  const comment = await Comment.create({ ...commentData, userId });

  const post = await Post.findById(commentData.postId);

  await notificationService.createNotification({
    userId: post.userId,
    type: "comment",
    relatedUserId: userId,
    relatedPostId: post._id,
    relatedCommentId: comment._id,
  });

  return comment;
};

const getAllComments = async ({ page = 1, limit = 10, postId }, userId) => {
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const filter = {};
  if (postId) filter.postId = postId;

  const [comments, totalComments] = await Promise.all([
    Comment.find(filter)
      .populate("userId", "name email")
      .populate("postId", "title author")
      .skip(skip)
      .limit(parseInt(limit)),
    Comment.countDocuments(filter),
  ]);

  const commentsWithOwnership = comments.map((comment) => {
    const commentObj = comment.toObject();
    commentObj.isOwner = comment.userId._id.toString() === userId.toString();
    return commentObj;
  });

  const pagination = {
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(totalComments / limit),
    totalComments,
  };

  return {
    comments: commentsWithOwnership,
    pagination,
  };
};

const getCommentById = async (id, userId) => {
  const comment = await Comment.findById(id)
    .populate("userId", "name email")
    .populate("postId", "userId title")
    .populate("likesCount");

  if (!comment) return null;

  const commentObj = comment.toObject();

  commentObj.isOwner = commentObj.userId._id.toString() === userId.toString();
  return commentObj;
};

const updateCommentById = async (id, commentData, userId) => {
  const comment = await Comment.findById(id);
  if (!comment) return null;

  if (comment.userId.toString() !== userId) {
    throw new APIError(
      "You are not the author of the comment so you cannot update it",
      403,
    );
  }

  comment.content = commentData.content || comment.content; // i will update one field so no need for .assign()
  comment.isEdited = true;
  comment.editedAt = new Date();

  const updatedComment = await comment.save();

  return updatedComment;
};

const deleteCommentById = async (id, userId) => {
  const comment = await Comment.findById(id)
    .populate("userId", "name email")
    .populate("postId", "userId title");

  if (!comment) return null;

  const isCommentAuthor = comment.userId._id.toString() === userId.toString();
  const isPostAuthor = comment.postId.userId.toString() === userId.toString();

  if (!isCommentAuthor && !isPostAuthor) {
    throw new APIError("You are not authorized to delete this comment", 403);
  }

  await comment.deleteOne();
  return comment;
};

const getCommentsByPost = async (postId, userId) => {
  const comments = await Comment.find({ postId })
    .populate("userId", "name email")
    .populate("postId", "title author")
    .sort({ createdAt: -1 }); // sort descending

  const commentsWithOwnership = comments.map((comment) => {
    const commentObj = comment.toObject();
    commentObj.isOwner = commentObj.userId._id.toString() === userId.toString();
    return commentObj;
  });

  return commentsWithOwnership;
};

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
  getCommentsByPost,
};
