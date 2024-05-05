const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatHistorySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const ChatHistoryModel = mongoose.model(
  "ChatHistory",
  ChatHistorySchema
);

module.exports = ChatHistoryModel;
