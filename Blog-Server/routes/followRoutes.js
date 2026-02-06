const express = require("express");
const router = express.Router();

const followController = require("../controllers/followControllers");
const authenticate = require("../middlewares/authenticate");

router.post(
  "/users/:userId/follow",
  authenticate,
  followController.createFollow,
);

router.delete(
  "/users/:userId/follow",
  authenticate,
  followController.unfollowUser,
);

router.get(
  "/users/:userId/followers",
  authenticate,
  followController.getUserFollowers,
);

router.get(
  "/users/:userId/following",
  authenticate,
  followController.getUserFollowing,
);

module.exports = router;
