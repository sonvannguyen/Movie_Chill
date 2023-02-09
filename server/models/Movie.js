const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    origin_name: {
        type: String,
        required: true
    },
    thumb_url: {
        type: String,
    },
    poster_url: {
        type: String,
    },
    type: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    year: {
        type: Number,
    },
    country: {
        type: String,
    },
    content: {
        type: String,
    },
    quality: {
        type: String,
    },
    lang: {
        type: String,
    },
    category: [
        {
            type: String,
        }
    ],
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
})

const MovieModel = mongoose.model('Movie', MovieSchema)

module.exports = MovieModel