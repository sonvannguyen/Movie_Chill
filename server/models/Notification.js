const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    urlMovie: {
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);

const NotificationModel = mongoose.model("Notification", NotificationSchema);

module.exports = NotificationModel;
