const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StorySchema = new Schema(
    {
        storyImage: {
            type: String,
            required: true
        },
        status: {
            type: String,
        },
        totalViews: {
            type: Number,
            default: 0
        },
        userViews: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User' 
            }
        ],
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

const StoryModel = mongoose.model('Story', StorySchema)

module.exports = StoryModel