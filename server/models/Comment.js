const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    userComment: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    },
    commentContent: {
        type: String,
        required: true,
        trim: true,
    },
    totalReport: {
        type: Number,
        default: 0
    },
}, {timestamps: true})

const CommentModel = mongoose.model('Comment', CommentSchema)

module.exports = CommentModel