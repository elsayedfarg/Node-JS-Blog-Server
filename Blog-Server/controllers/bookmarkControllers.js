const bookmarkService = require("../services/bookmarkServices");
const Post = require("../models/postModel");
const APIError = require("../utils/APIError");
const sendResponse = require("../utils/sendResponse");

const createBookmark = async (req, res) => {
  const userId = req.user.userId;
  const postId = req.params.postId;

  const post = await Post.findById(postId);
  if (!post) {
    throw new APIError("Post not found", 404);
  }

  const bookmark = await bookmarkService.createBookmark(userId, postId);
  sendResponse(res, bookmark, 201);
};

const getUserBookmarks = async (req, res) => {
  const userId = req.user.userId;

  const bookmarks = await bookmarkService.getUserBookmarks(userId);

  sendResponse(res, bookmarks, 200, {
    results: bookmarks.length,
  });
};

const removeBookmark = async (req, res) => {
  const userId = req.user.userId;
  const postId = req.params.postId;

  const bookmark = await bookmarkService.removeBookmark(userId, postId);

  if (!bookmark) {
    throw new APIError("Bookmark not found", 404);
  }

  sendResponse(res, null, 200, {
    message: "Bookmark removed successfully",
  });
};

module.exports = {
  createBookmark,
  getUserBookmarks,
  removeBookmark,
};
