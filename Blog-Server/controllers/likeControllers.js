const likeService = require("../services/likeServices");
const sendResponse = require("../utils/sendResponse");

const toggleLike = async (req, res) => {
  const { targetType, targetId } = req.body;
  const userId = req.user.userId;

  const likeStatus = await likeService.toggleLike(userId, targetType, targetId);

  sendResponse(res, likeStatus, 201);
};
const getLikesCount = async (req, res) => {
  const { targetType, targetId } = req.query;

  const likesCount = await likeService.getLikesCount(targetType, targetId);

  sendResponse(res, { count: likesCount }, 200);
};

const isLikedByUser = async (req, res) => {
  const { targetType, targetId } = req.query;
  const userId = req.user.userId;

  const likedByUser = await likeService.isLikedByUser(
    userId,
    targetType,
    targetId,
  );

  sendResponse(res, { liked: likedByUser }, 200);
};

const getUserLikes = async (req, res) => {
  const userId = req.params.userId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const { userLikes, pagination } = await likeService.getUserLikes(userId, {
    page,
    limit,
  });

  sendResponse(res, { userLikes, pagination }, 200);
};

module.exports = {
  toggleLike,
  getLikesCount,
  isLikedByUser,
  getUserLikes,
};
