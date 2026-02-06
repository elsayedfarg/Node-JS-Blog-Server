const express = require("express");
const router = express.Router();

const userController = require("../controllers/userControllers");
const schemas = require("../schemas/userSchemas");
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");
const restrictTo = require("../middlewares/restrictTo");

const likeController = require("../controllers/likeControllers");
const likeSchemas = require("../schemas/likeSchemas");

const { uploadProfilePicture } = require("../middlewares/upload");
const uploadController = require("../controllers/uploadControllers");

const passwordController = require("../controllers/passwordResetControllers");
const passwordSchemas = require("../schemas/passwordSchemas");

const bookmarkController = require("../controllers/bookmarkControllers");

const {
  authLimiter,
  passwordResetLimiter,
  uploadLimiter,
} = require("../middlewares/rateLimiter");

router.get("/search", userController.searchUser);

router.post(
  "/sign-up",
  authLimiter,
  validate(schemas.signUpSchema),
  userController.signUp,
);
router.post(
  "/sign-in",
  authLimiter,
  validate(schemas.signInSchema),
  userController.signIn,
);

router.post(
  "/forgot-password",
  passwordResetLimiter,
  validate(passwordSchemas.forgotPasswordSchema),
  passwordController.forgotPassword,
);
router.post(
  "/reset-password",
  passwordResetLimiter,
  validate(passwordSchemas.resetPasswordSchema),
  passwordController.resetPassword,
);
router.patch(
  "/change-password",
  authenticate,
  validate(passwordSchemas.changePasswordSchema),
  passwordController.changePassword,
);

router.post(
  "/profile-picture",
  authenticate,
  uploadLimiter,
  uploadProfilePicture,
  uploadController.uploadProfilePicture,
);

router.delete(
  "/profile-picture",
  authenticate,
  uploadController.deleteProfilePicture,
);

router.get("/bookmarks", authenticate, bookmarkController.getUserBookmarks);

router
  .route("/")
  .get(
    authenticate,
    restrictTo(["admin", "user"]),
    validate(schemas.getAllUsersSchema),
    userController.getAllUsers,
  );

router
  .route("/:userId")
  .get(
    authenticate,
    restrictTo(["admin", "user"]),
    validate(schemas.userIdSchema),
    userController.getUserById,
  )
  .patch(
    authenticate,
    restrictTo(["admin"]),
    validate(schemas.updateUserSchema),
    userController.updateUserById,
  )
  .delete(
    authenticate,
    restrictTo(["admin"]),
    validate(schemas.userIdSchema),
    userController.deleteUserById,
  );

router.get(
  "/:userId/likes",
  authenticate,
  validate(likeSchemas.getUserLikesSchema),
  likeController.getUserLikes,
);

module.exports = router;
