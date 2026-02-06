const express = require("express");
const router = express.Router();

const notificationController = require("../controllers/notificationControllers");
const schemas = require("../schemas/notificationSchemas");
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");

router.use(authenticate);

router.get(
  "/",
  validate(schemas.getUserNotificationsSchema),
  notificationController.getUserNotifications,
);

router.patch(
  "/:id/read",
  validate(schemas.notificationIdSchema),
  notificationController.markAsRead,
);

router.patch("/read-all", notificationController.markAllAsRead);

module.exports = router;
