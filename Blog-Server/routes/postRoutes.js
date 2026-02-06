const express = require("express");
const router = express.Router();

const postController = require("../controllers/postControllers");
const schemas = require("../schemas/postSchemas");
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");

const commentController = require("../controllers/commentControllers");
const commentSchemas = require("../schemas/commentSchemas");

const { uploadPostImages } = require("../middlewares/upload");
const uploadController = require("../controllers/uploadControllers");

const bookmarkController = require("../controllers/bookmarkControllers");

router.use(authenticate);

router.post("/:id/view", postController.viewPost);

router.get("/drafts", postController.getDrafts);

router.post("/:id/publish", postController.publishPost);

router.post("/:id/schedule", postController.schedulePost);

router.get(
  "/search",
  validate(schemas.searchPostsSchema),
  postController.searchPost,
);

router.post(
  "/:postId/images",
  uploadPostImages,
  uploadController.uploadPostImages,
);

router.delete("/:postId/images/:imageId", uploadController.deletePostImage);

router.post(
  "/:postId/bookmark",
  validate(schemas.postIdSchema),
  bookmarkController.createBookmark,
);

router.delete(
  "/:postId/bookmark",
  validate(schemas.postIdSchema),
  bookmarkController.removeBookmark,
);

router
  .route("/")
  .get(validate(schemas.getAllPostsSchema), postController.getAllPosts)
  .post(validate(schemas.createPostSchema), postController.createPost);

router
  .route("/:postId")
  .get(validate(schemas.postIdSchema), postController.getPostById)
  .patch(validate(schemas.updatePostSchema), postController.updatePostById)
  .delete(validate(schemas.postIdSchema), postController.deletePostById);

router.get(
  "/:postId/comments",
  validate(commentSchemas.getCommentsByPostSchema),
  commentController.getCommentsByPost,
);

module.exports = router;
