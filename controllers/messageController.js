const createError = require('http-errors')
const MessageModel = require('../models/Message')

const messageController = {
    createNewMessage : async(req, res, next) => {
        try {
            const newMessage = new MessageModel(req.body)
            await newMessage.save()
            return res.status(200).json(newMessage)
            
        } catch (error) {
            next(createError(500, error.message))
        }
    },

    getMessageByConversationId: async(req, res, next) => {
        try {
            const {conversationId} = req.params 
            const message = await MessageModel.find({conversationId})
            return res.status(200).json(message)
        } catch (error) {
            next(createError(500, error.message))
        }
    }
}

module.exports = messageController