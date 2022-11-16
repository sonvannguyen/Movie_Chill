const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema(
    {
        postImage: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        isPin: {
            type: Boolean,
            default: false
        },
        totalLoves: {
            type: Number,
            default: 0
        },
        userLoves: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        totalComments: {
            type: Number,
            default: 0
        },
        comments: [
            {   
                userComment: {
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                },
                commentContent: {
                    type: String
                }

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

const PostModel = mongoose.model('Post', PostSchema)

module.exports = PostModel