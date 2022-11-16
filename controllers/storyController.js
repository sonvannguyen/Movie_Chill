const createError = require('http-errors')
const StoryModel = require('../models/Story')
const UserModel = require('../models/User')


const storyController = {
    createNewStoryByUserId: async(req, res, next) => {
        try {
            const {userId} = req.params 
            const newStory = new StoryModel(req.body)
            const user = await UserModel.findById(userId)

            newStory.owner = user._id
            await newStory.save()

            user.stories.push(newStory._id)
            await user.save()

            return res.json(newStory)
        } catch (error) {
            next(createError(500, error.message))
        }
    },
    getStoriesByUserId: async(req, res, next) => {
        try {
            const {userId} = req.params
            const user = await UserModel.findOne({_id: userId}).populate('stories')
            return res.status(200).json(user.stories.reverse())

        } catch (error) {
            next(createError(500, error.message))
        }
    },
    getAllStories: async(req, res, next) => {
        try {
            const stories = await StoryModel.find().populate({ path: 'owner', select: 'name avatar' }).sort({createdAt: -1})
            return res.status(200).json(stories)

        } catch (error) {
            next(createError(500, error.message))
        }
    },
    getAllTheFollowingStories: async(req, res, next) => {
        try {
           const {userId} = req.params
           const users = await UserModel.findById(userId).populate(
                {
                    path: 'followings',
                    select: '_id'
                }
           )
           const stories = await StoryModel.find({owner: { "$in": users.followings }}).populate({ path: 'owner', select: 'name avatar' }).sort({createdAt: -1})
           
           return res.json(stories)

        } catch (error) {
            next(createError(500, error.message))
        }
    },
    updateStoryByStoryId: async(req, res, next) => {
        try {
            const {storyId} = req.params
            const {owner} = req.body
            const newStory = await StoryModel.findOneAndUpdate({_id: storyId, owner}, req.body, {new: true})
            if(newStory){
                return res.status(200).json({newStory})
            }
            throw createError(404, `Not found Story`)

        } catch (error) {
            next(createError(500, error.message))
        }
    },
    deleteStoryByStoryId: async(req, res, next) => {
        try {
            const {storyId, userId} = req.params
            const result = await StoryModel.findByIdAndDelete(storyId)

            if(!result) {
                throw createError(404, 'Story does not exist.')
            }

            // update data stories for user table
            const user = await UserModel.findById(userId)
            user.stories = user.stories.filter((story) => story != storyId)
            await user.save()

            res.status(200).json({message: "Delete success"})

        } catch (error) {
            next(createError(500, error.message))
        }
    }
}

module.exports = storyController