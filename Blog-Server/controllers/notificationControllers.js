const notificationService = require("../services/notificationServices");
const sendResponse = require("../utils/sendResponse");

const getUserNotifications = async (req, res) => {
  const userId = req.user.userId;

  const { notifications, pagination } =
    await notificationService.getUserNotifications(userId, req.query);

  sendResponse(res, notifications, 200, {
    results: notifications.length,
    pagination,
  });
};

const markAsRead = async (req, res) => {
  const userId = req.user.userId;
  const notificationId = req.params.id;

  const notification = await notificationService.markAsRead(
    notificationId,
    userId,
  );

  sendResponse(res, notification, 200);
};

const markAllAsRead = async (req, res) => {
  const userId = req.user.userId;

  const result = await notificationService.markAllAsRead(userId);

  sendResponse(res, null, 200, {
    message: "All notifications marked as read",
    modifiedCount: result.modifiedCount,
  });
};

module.exports = {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
};
