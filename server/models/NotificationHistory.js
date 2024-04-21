const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationHistorySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    notificationId: {
      type: Schema.Types.ObjectId,
      ref: "Notification",
    },
    status: {
      type: String,
      default: "UNREAD",
    },
  },
  { timestamps: true }
);

const NotificationHistoryModel = mongoose.model(
  "NotificationHistory",
  NotificationHistorySchema
);

module.exports = NotificationHistoryModel;
