const followService = require("../services/followServices");
const User = require("../models/userModel");
const APIError = require("../utils/APIError");
const sendResponse = require("../utils/sendResponse");

const createFollow = async (req, res) => {
  // get the followerId (logged in user)
  const followerId = req.user.userId;

  // get the user he want to follow from the req params
  const followingId = req.params.userId;

  // you can not follow yourself
  if (followerId.toString() === followingId.toString())
    throw new APIError("You can not follow yourself", 400);

  // check if the user you want to follow found or not
  const userToFollow = await User.findById(followingId);

  if (!userToFollow)
    throw new APIError("The user you want to follow is not found", 400);

  // create follow
  const follow = await followService.createFollow(followerId, followingId);
  sendResponse(res, follow, 201);
};

const getUserFollowers = async (req, res) => {
  const userId = req.params.userId;

  if (!userId) throw new APIError("User not found", 404);

  const userFollowers = await followService.getUserFollowers(userId);

  sendResponse(res, userFollowers, 200, {
    results: userFollowers.length,
  });
};

const getUserFollowing = async (req, res) => {
  const userId = req.params.userId;

  if (!userId) throw new APIError("User not found", 404);

  const following = await followService.getUserFollowing(userId);

  sendResponse(res, following, 200, {
    results: following.length,
  });
};

const unfollowUser = async (req, res) => {
  const followerId = req.user.userId;
  const followingId = req.params.userId;

  const unfollow = await followService.unfollowUser(followerId, followingId);

  if (!unfollow) {
    throw new APIError("You are not following this user", 400);
  }

  sendResponse(res, null, 200, {
    message: "Unfollowed successfully",
  });
};

module.exports = {
  createFollow,
  getUserFollowers,
  getUserFollowing,
  unfollowUser,
};
