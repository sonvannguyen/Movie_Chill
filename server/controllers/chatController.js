const ChatHistoryModel = require("../models/ChatHistory");

const chatController = {
  createChat: async (chatData) => {
    const newChat = new ChatHistoryModel({
      userId: chatData.userId,
      message: chatData.message,
    });
    await newChat.save();
  },

  getChatsHistory: async () => {
    const chatsHistory = await ChatHistoryModel.find({})
      .populate({
        path: "userId",
        select: "username avatar isAdmin",
      })
      .sort({
        updatedAt: 1,
      });
    return chatsHistory;
  },
};

module.exports = chatController;
