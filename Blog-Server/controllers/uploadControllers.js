const User = require("../models/userModel");
const Post = require("../models/postModel");
const ImageKitService = require("../services/imageKitServices");
const APIError = require("../utils/APIError");

exports.uploadProfilePicture = async (req, res) => {
  if (!req.file) throw new APIError("No file uploaded", 400);

  const result = await ImageKitService.uploadImage(
    req.file,
    "profile-pictures",
    `profile-${req.user.userId}`,
  );

  const updatedUser = await User.findByIdAndUpdate(
    req.user.userId,
    {
      profilePicture: {
        url: result.url,
        fileId: result.fileId,
        filePath: result.filePath,
      },
    },
    { new: true, select: "-password" },
  );

  const thumbnailUrl = ImageKitService.getImageUrl(result.filePath, {
    height: 150,
    width: 150,
    crop: "maintain_ratio",
  });

  res.status(200).json({
    message: "Profile picture uploaded",
    user: updatedUser,
    url: result.url,
    thumbnail: thumbnailUrl,
  });
};

exports.deleteProfilePicture = async (req, res) => {
  const user = await User.findById(req.user.userId);

  if (!user.profilePicture || !user.profilePicture.fileId) {
    throw new APIError("No profile picture to delete", 400);
  }

  await ImageKitService.deleteImage(user.profilePicture.fileId);

  await User.findByIdAndUpdate(req.user.userId, {
    profilePicture: null,
  });

  res.status(200).json({
    message: "Profile picture deleted",
  });
};

exports.uploadPostImages = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    throw new APIError("No files uploaded", 400);
  }

  const post = await Post.findById(req.params.postId);
  if (!post) throw new APIError("Post not found", 404);

  if (post.userId.toString() !== req.user.userId && req.user.role !== "admin") {
    throw new APIError("Not authorized", 403);
  }

  const uploadedImages = [];

  for (const file of req.files) {
    const result = await ImageKitService.uploadImage(
      file,
      "post-images",
      `post-${req.params.postId}-${Date.now()}`,
    );

    uploadedImages.push({
      url: result.url,
      fileId: result.fileId,
      filePath: result.filePath,
    });
  }

  post.images.push(...uploadedImages);
  await post.save();

  res.status(200).json({
    message: "Images uploaded",
    images: uploadedImages,
    total: post.images.length,
  });
};

exports.deletePostImage = async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (!post) throw new APIError("Post not found", 404);

  if (post.userId.toString() !== req.user.userId && req.user.role !== "admin") {
    throw new APIError("Not authorized", 403);
  }

  const imageIndex = post.images.findIndex(
    (img) => img.fileId === req.params.imageId,
  );

  if (imageIndex === -1) {
    throw new APIError("Image not found", 404);
  }

  const fileIdToDelete = post.images[imageIndex].fileId;

  post.images.splice(imageIndex, 1);
  await post.save();

  await ImageKitService.deleteImage(fileIdToDelete);

  res.status(200).json({
    message: "Image deleted",
    remaining: post.images.length,
  });
};
