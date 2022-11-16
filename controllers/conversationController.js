const createError = require('http-errors')
const ConversationModel = require('../models/Conversation')

const conversationController = {
    createNewConversation: async(req,res,next) => {
        try {
            // get id user in conversation
            const {sender, receiver} = req.body
            const oldConversation1 = await ConversationModel.findOne({
                sender,
                receiver
            })
            const oldConversation2 = await ConversationModel.findOne({
                sender: receiver,
                receiver: sender
            })
            if(oldConversation1 ){
                return res.status(200).json(oldConversation1)
            }
            if(oldConversation2){
                return res.status(200).json(oldConversation2)
            }

            const newConversation = new ConversationModel({
                sender,
                receiver
            })
            await newConversation.save()

            return res.status(200).json(newConversation)

        } catch(error){
            next(createError(500, error.message))
        }
    },
    getListConversationOfUser: async(req, res, next) => {
        try {
            const {userId} = req.params
            const conversations = await ConversationModel.find({
                $or: [{sender: userId }, {receiver: userId}]
            }).sort({createdAt: -1})

            if(conversations){
                return res.status(200).json(conversations)
            }
            else {
                return res.json("No conversations")
            }

        } catch(error) {
            next(createError(500, error.message))
        }
    },
    getConversationForBoxChat: async(req, res, next) => {
        try {
            const {senderId, receiverId} = req.params 
            const conversation = await ConversationModel.findOne({
                members: [senderId, receiverId ] 
            })

            return res.status(200).json({conversation})

        } catch(error) {
            next(createError(500, error.message))
        }
    },
    deleteConversation: async(req, res, next) => {
        try {
            const {conversationId} = req.params
            const conversation = await ConversationModel.findByIdAndDelete(conversationId)

            if(conversation){
                return res.json("Delete conversation success")
            }
            else {
                return res.json("No conversation")
            }
           
        } catch(error) {
            next(createError(500, error.message))
        }
    }
}

module.exports = conversationController