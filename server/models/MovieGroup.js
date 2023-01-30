const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieGroupSchema = new Schema({
    groupName: {
        type: String,
        required: true
    },
    movieList: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Movie'
        }
    ]
})

const MovieGroupModel = mongoose.model('MovieGroup', MovieGroupSchema)

module.exports = MovieGroupModel