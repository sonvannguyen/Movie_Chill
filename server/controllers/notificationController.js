const createError = require("http-errors");
const UserModel = require("../models/User");
const NotificationModel = require("../models/Notification");
const NotificationHistoryModel = require("../models/NotificationHistory");

const notificationController = {
  createNotification: async (req, res, next) => {
    try {
      const { content } = req.body;
      const newNotification = new NotificationModel({
        content: content,
        type: "ALL",
      });
      const savedNotification = await newNotification.save();
      const notificationId = savedNotification._id;

      UserModel.find({})
        .select("_id")
        .then(async (users) => {
          for (const user of users) {
            const newNotiHistory = new NotificationHistoryModel({
              userId: user._id,
              notificationId: notificationId,
              status: "UNREAD",
            });
            await newNotiHistory.save();
          }
        });

      // TODO: emit noti
      return res.json({ newNotification });
    } catch (error) {
      next(createError(500, error.message));
    }
  },
  createNotificationForMovie: async (content, urlMovie, listUserFollow) => {
    try {
      const newNotification = new NotificationModel({
        content: content,
        urlMovie: urlMovie,
        type: "USER",
      });
      const savedNotification = await newNotification.save();
      const notificationId = savedNotification._id;

      for (userId of listUserFollow) {
        const newNotiHistory = new NotificationHistoryModel({
          userId: userId,
          notificationId: notificationId,
          status: "UNREAD",
        });
        await newNotiHistory.save();
      }
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
      await NotificationHistoryModel.deleteMany({
        notificationId,
      });
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
      const { userId, action } = req.params;
      const notificationMovie = await NotificationHistoryModel.find({
        userId: userId,
      })
        .populate({ path: "notificationId" })
        .sort({ updatedAt: -1 });

      if (action == "byUser") {
        //handle change status to read
        await NotificationHistoryModel.updateMany({ _id: { $in: notificationMovie.map(noti => noti._id) } }, { status: "READ" });
      }
      return res.json(notificationMovie);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = notificationController;
