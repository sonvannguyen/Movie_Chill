const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema(
    {
        senderId: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        conversationId: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
)

const MessageModel = mongoose.model('Message', MessageSchema)

module.exports = MessageModel