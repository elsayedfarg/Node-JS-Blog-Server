const Follow = require("../models/follows");
// const User = require("../models/userModel");
const notificationService = require("./notificationServices");

// the logged in user can follow another user
const createFollow = async (followerId, followingId) => {
  const follow = await Follow.create({
    followerId,
    followingId,
  });

  await notificationService.createNotification({
    userId: followingId,
    type: "follow",
    relatedUserId: followerId,
  });

  return follow;
};

const getUserFollowers = async (userId) => {
  const followers = await Follow.find({
    followingId: userId,
  }).populate("followerId", "name email");

  return followers;
};

const getUserFollowing = async (userId) => {
  const following = await Follow.find({
    followerId: userId,
  }).populate("followingId", "name email");

  return following;
};

const unfollowUser = async (followerId, followingId) => {
  const result = await Follow.findOneAndDelete({
    followerId,
    followingId,
  });

  return result;
};

module.exports = {
  createFollow,
  getUserFollowers,
  getUserFollowing,
  unfollowUser,
};
