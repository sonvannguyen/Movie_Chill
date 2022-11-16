const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ConversationSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            required: true
        },
        receiver: {
            type: Schema.Types.ObjectId,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const ConversationModel = mongoose.model('Conversation', ConversationSchema)

module.exports = ConversationModel