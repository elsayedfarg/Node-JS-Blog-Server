const Bookmark = require("../models/bookmarks");

const createBookmark = async (userId, postId) => {
  const bookmark = await Bookmark.create({
    userId,
    postId,
  });

  return bookmark;
};

// Get user bookmarked posts
const getUserBookmarks = async (userId) => {
  const bookmarks = await Bookmark.find({ userId }).populate({
    path: "postId",
    populate: {
      path: "userId",
      select: "name email",
    },
  });

  return bookmarks;
};

const removeBookmark = async (userId, postId) => {
  const result = await Bookmark.findOneAndDelete({
    userId,
    postId,
  });

  return result;
};

module.exports = {
  createBookmark,
  getUserBookmarks,
  removeBookmark,
};
