const postService = require("../services/postServices");
const APIError = require("../utils/APIError");
const sendResponse = require("../utils/sendResponse");

const viewPost = async (req, res) => {
  const post = await postService.incrementPostView(req.params.id);
  sendResponse(res, post, 200, { message: "View count incremented" });
};

const getDrafts = async (req, res) => {
  const drafts = await postService.getUserDrafts(req.user.userId);
  sendResponse(res, drafts, 200, { results: drafts.length });
};

const publishPost = async (req, res) => {
  const post = await postService.publishPost(req.params.id, req.user.userId);
  sendResponse(res, post, 200, { message: "Post published successfully" });
};

const schedulePost = async (req, res) => {
  if (!req.body) throw new APIError("publishedAt is required in body", 400);
  const { publishedAt } = req.body;

  const post = await postService.schedulePost(
    req.params.id,
    req.user.userId,
    publishedAt,
  );
  sendResponse(res, post, 200, { message: "Post scheduled successfully" });
};

const createPost = async (req, res) => {
  const newPost = await postService.createPost(req.body, req.user.userId);

  sendResponse(res, newPost, 201);
};

const getAllPosts = async (req, res) => {
  const { posts: postsWithOwnership, pagination } =
    await postService.getAllPosts(req.query, req.user.userId);

  sendResponse(res, postsWithOwnership, 200, {
    results: postsWithOwnership.length,
    pagination,
  });
};

const getPostById = async (req, res) => {
  const post = await postService.getPostById(
    req.params.postId,
    req.user.userId,
  );

  if (!post) {
    throw new APIError("Post not found", 404);
  }

  sendResponse(res, post);
};

const updatePostById = async (req, res) => {
  const updatedPost = await postService.updatePostById(
    req.params.postId,
    req.body,
    req.user.userId,
  );

  if (!updatedPost) {
    throw new APIError("Post not found", 404);
  }

  sendResponse(res, updatedPost);
};

const deletePostById = async (req, res) => {
  const deletedPost = await postService.deletePostById(
    req.params.postId,
    req.user.userId,
  );

  if (!deletedPost) {
    throw new APIError("Post not found", 404);
  }

  res.status(200).json({
    status: "success",
    message: "Post deleted successfully",
  });
};

const searchPost = async (req, res) => {
  const { q } = req.query;

  const posts = await postService.searchPost(q, req.query, req.user.userId);

  sendResponse(res, posts, 200, {
    results: posts.length,
  });
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
  searchPost,
  getDrafts,
  publishPost,
  schedulePost,
  viewPost,
};
