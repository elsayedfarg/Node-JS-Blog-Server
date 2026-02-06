const Post = require("../models/postModel");
const APIError = require("../utils/APIError");

const incrementPostView = async (postId) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found");

  post.views += 1;
  await post.save();

  return post;
};

const getUserDrafts = async (userId) => {
  return await Post.find({ userId, status: "draft" });
};

const publishPost = async (postId, userId) => {
  const post = await Post.findById(postId);

  if (!post) throw new APIError("Post not found", 404);

  if (post.userId.toString() !== userId.toString())
    throw new APIError("Not authorized", 403);

  if (post.status === "published")
    throw new APIError("Post is already published", 400);

  post.status = "published";
  post.publishedAt = new Date();
  await post.save();

  return post;
};

const schedulePost = async (postId, userId, publishDate) => {
  const post = await Post.findById(postId);
  if (!post) throw new APIError("Post not found", 404);

  if (post.userId.toString() !== userId.toString())
    throw new APIError("Not authorized", 403);

  if (post.status === "published")
    throw new APIError("Post is already published", 400);

  post.status = "scheduled";
  post.publishedAt = new Date(publishDate);
  await post.save();

  return post;
};

const createPost = async (postData, userId) => {
  return await Post.create({ ...postData, userId });
};

const getAllPosts = async ({ page = 1, limit = 10 }, userId) => {
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [posts, totalPosts] = await Promise.all([
    Post.find()
      .populate("userId", "name email")
      .populate("likesCount")
      .skip(skip)
      .limit(parseInt(limit)),
    Post.countDocuments(),
  ]);

  const postsWithOwnership = posts.map((post) => {
    const postObj = post.toObject();
    postObj.isOwner = post.userId._id.toString() === userId.toString();
    return postObj;
  });

  const pagination = {
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(totalPosts / limit),
    totalPosts,
  };

  return { posts: postsWithOwnership, pagination };
};

const getPostById = async (postId, userId) => {
  const post = await Post.findById(postId)
    .populate("userId", "name email")
    .populate("likesCount");

  if (!post) return null;

  const postObj = post.toObject();
  postObj.isOwner = post.userId._id.toString() === userId.toString();

  return postObj;
};

const updatePostById = async (postId, postData, userId) => {
  const post = await Post.findById(postId);

  if (!post) return null;

  if (post.userId.toString() !== userId.toString()) {
    throw new APIError("You are not allowed to update this post", 403);
  }

  Object.assign(post, postData); // if you want to update many fields
  await post.save();

  return post;
};

const deletePostById = async (postId, userId) => {
  const post = await Post.findById(postId);

  if (!post) return null;

  if (post.userId.toString() !== userId.toString()) {
    throw new APIError("You are not allowed to delete this post", 403);
  }

  await post.deleteOne();
  return post;
};

const searchPost = async (keyword, queryParams, userId) => {
  const { tags, from, to } = queryParams;

  let filter = {
    $text: { $search: keyword },
  };

  if (tags) filter.tags = { $in: tags.split(",") };

  if (from || to) {
    filter.createdAt = {};
    if (from) filter.createdAt.$gte = new Date(from);
    if (to) filter.createdAt.$lte = new Date(to);
  }

  const posts = await Post.find(filter)
    .populate("userId", "name email")
    .populate("likesCount");

  return posts;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
  searchPost,
  getUserDrafts,
  publishPost,
  schedulePost,
  incrementPostView,
};
