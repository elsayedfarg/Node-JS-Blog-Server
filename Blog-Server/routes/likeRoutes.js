const express = require("express");
const router = express.Router();

const likeController = require("../controllers/likeControllers");
const schemas = require("../schemas/likeSchemas");
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");

router.post(
  "/",
  authenticate,
  validate(schemas.toggleLikeSchema),
  likeController.toggleLike,
);

router.get(
  "/count",
  validate(schemas.getLikesCountSchema),
  likeController.getLikesCount,
);

router.get(
  "/check",
  authenticate,
  validate(schemas.checkLikeSchema),
  likeController.isLikedByUser,
);

module.exports = router;
