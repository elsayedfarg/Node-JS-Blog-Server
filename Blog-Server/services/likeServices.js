const Like = require("../models/likeModel");
const notificationService = require("./notificationServices");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

const toggleLike = async (userId, targetType, targetId) => {
  const likeExists = await Like.findOne({ userId, targetType, targetId });

  if (likeExists) {
    await Like.findOneAndDelete({ userId, targetType, targetId });
    return "unliked";
  } else {
    await Like.create({ userId, targetType, targetId });
  }

  // sending notifications
  if (targetType === "Post") {
    const post = await Post.findById(targetId);
    if (post.userId.toString() !== userId.toString()) {
      await notificationService.createNotification({
        userId: post.userId,
        type: "like",
        relatedUserId: userId,
        relatedPostId: targetId,
      });
    }
  } else if (targetType === "Comment") {
    const comment = await Comment.findById(targetId);
    if (comment.userId.toString() !== userId.toString()) {
      await notificationService.createNotification({
        userId: comment.userId,
        type: "like",
        relatedUserId: userId,
        relatedCommentId: targetId,
      });
    }
  }
  return "liked";
};

const getLikesCount = async (targetType, targetId) => {
  const likesCount = await Like.countDocuments({ targetType, targetId });
  return likesCount;
};

const isLikedByUser = async (userId, targetType, targetId) => {
  const like = await Like.findOne({ userId, targetType, targetId });
  return like ? true : false;
};

const getUserLikes = async (userId, query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;

  const [userLikes, totalLikes] = await Promise.all([
    Like.find({ userId })
      .populate("targetId", "title content")
      .skip((page - 1) * limit)
      .limit(limit),
    Like.countDocuments({ userId }),
  ]);

  const pagination = {
    page,
    limit,
    totalPages: Math.ceil(totalLikes / limit),
    totalLikes,
  };

  return { userLikes, pagination };
};

module.exports = {
  toggleLike,
  getLikesCount,
  isLikedByUser,
  getUserLikes,
};
