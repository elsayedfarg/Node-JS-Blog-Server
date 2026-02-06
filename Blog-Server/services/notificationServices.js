const Notification = require("../models/notificationModel");
const APIError = require("../utils/APIError");

const createNotification = async (notificationData) => {
  const notification = await Notification.create(notificationData);
  return notification;
};

const getUserNotifications = async (userId, query) => {
  const { page = 1, limit = 10 } = query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [notifications, totalNotifications] = await Promise.all([
    Notification.find({ userId })
      .populate("relatedUserId", "name email")
      .populate("relatedPostId", "title")
      .populate("relatedCommentId", "content")
      .skip(skip)
      .limit(parseInt(limit)),
    Notification.countDocuments({ userId }),
  ]);

  const pagination = {
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(totalNotifications / limit),
    totalNotifications,
  };

  return { notifications, pagination };
};

const markAsRead = async (notificationId, userId) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: notificationId, userId },
    { read: true },
    { new: true },
  );

  if (!notification) {
    throw new APIError("Notification not found", 404);
  }

  return notification;
};

const markAllAsRead = async (userId) => {
  const result = await Notification.updateMany(
    { userId, read: false },
    { read: true },
  );

  return result;
};

module.exports = {
  createNotification,
  getUserNotifications,
  markAsRead,
  markAllAsRead,
};
