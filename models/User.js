const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            min: 10,
            default: "No Name"
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            min: 6
        },
        gmail: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            trim: true,
            min: 8
        },
        avatar: {
            type: String,
            default: "https://tleliteracy.com/wp-content/uploads/2017/02/default-avatar.png"
        },
        isVip: {
            type: Boolean,
            default: false
        },
        backgroundTheme: {
            type: String,
            default: "https://wallpaperaccess.com/full/1288076.jpg"
        },
        facebookLink: {
            type: String
        },
        instagramLink: {
            type: String
        },
        tiktokLink: {
            type: String
        },
        slogan: {
            type: String
        },
        liveIn: {
            type: String
        },
        studyAt: {
            type: String
        },
        relationship: {
            type: String
        },
        favorite: {
            type: String
        },
        totalFollowers: {
            type: Number,
            default: 0
        },
        totalFollowings: {
            type: Number,
            default: 0
        },
        totalPosts: {
            type: Number,
            default: 0
        },
        totalLoves: {
            type: Number,
            default: 0
        },
        followers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        followings: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        stories: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Story'
            }
        ],
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        ],
        usersViewProfile: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
    }, 
    {
        timestamps: true
    }
)

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel