const createError = require("http-errors");
const UserModel = require("../models/User");
const NotificationModel = require("../models/Notification");

const notificationController = {
  createNotification: async (req, res, next) => {
    try {
      const { content } = req.body;
      const newNotification = new NotificationModel({
        content: content,
        type: "ALL",
      });
      await newNotification.save();
      // TODO: emit noti
      return res.json({ newNotification });
    } catch (error) {
      next(createError(500, error.message));
    }
  },
  createNotificationForMovie: async (content, listUserFollow) => {
    try {
      const newNotification = new NotificationModel({
        content: content,
        type: "USER",
        target: listUserFollow,
      });
      await newNotification.save();
      // TODO: emit noti
      return true;
    } catch (error) {
      return false;
    }
  },
  deleteNotification: async (req, res, next) => {
    try {
      const { notificationId } = req.params;

      await NotificationModel.findByIdAndDelete(notificationId);
      return res.json({ message: "Notification deleted" });
    } catch (error) {
      next(createError(500, error.message));
    }
  },
  getNotificationHistoryForAdmin: async (req, res, next) => {
    try {
      const notificationHistory = await NotificationModel.find({});
      return res.json({ notificationHistory });
    } catch (error) {
      next(error);
    }
  },
  getNotificationForUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const notification = await NotificationModel.find({
        target: { $in: userId },
      });
      return res.json({ notification });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = notificationController;
