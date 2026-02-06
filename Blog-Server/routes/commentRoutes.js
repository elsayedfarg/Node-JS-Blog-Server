const express = require("express");
const router = express.Router();

const commentController = require("../controllers/commentControllers");
const schemas = require("../schemas/commentSchemas");
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");

router
  .route("/")
  .get(
    authenticate,
    validate(schemas.getAllCommentsSchema),
    commentController.getAllComments,
  )
  .post(
    authenticate,
    validate(schemas.createCommentSchema),
    commentController.createComment,
  );

router
  .route("/:commentId")
  .get(
    authenticate,
    validate(schemas.commentIdSchema),
    commentController.getCommentById,
  )
  .patch(
    authenticate,
    validate(schemas.updateCommentSchema),
    commentController.updateCommentById,
  )
  .delete(
    authenticate,
    validate(schemas.commentIdSchema),
    commentController.deleteCommentById,
  );

module.exports = router;
