const createError = require('http-errors')
const PostModel = require('../models/Post')
const UserModel = require('../models/User')

const postController = {
    createNewPostByUserId: async(req, res, next) => {
        try {
            const {userId} = req.params

            const newPost =  new PostModel(req.body)

            const user = await UserModel.findById(userId)

            // save owner for post
            newPost.owner = user._id
            await newPost.save()

            // update data posts for user table
            user.posts.push(newPost._id)
            user.totalPosts += 1
            await user.save()

            return res.json(newPost)
        } catch (error) {
            next(createError(500, error.message))
        }
    },
    // getPostsByPage: async(req, res, next) => {
    //     try {
    //         const LIMIT = 5;
    //         const {page} = req.query
    //         const totalPosts = await PostModel.countDocuments()
    //         const startIndex = (page - 1) * LIMIT
    //         const totalPage = Math.ceil(totalPosts / LIMIT) 

    //         const posts =  await PostModel.find()
    //             .skip(startIndex)
    //             .limit(LIMIT)
    //             .sort({createdAt: -1})
    //             .populate({ path: 'owner', select: 'name avatar' })
    //             .sort({createdAt: -1})
                
    //         return res.status(200).json(posts)
           
    //     } catch (error) {
    //         next(createError(500, error.message))
    //     }
    // },
    getAllPosts: async(req, res, next) => {
        try {
            const posts = await PostModel.find().populate({ path: 'owner', select: 'name avatar' }).sort({createdAt: -1})
            return res.status(200).json(posts)

        } catch (error) {
            next(createError(500, error.message))
        }
    },
    getAllTheFollowingPosts: async(req, res, next) => {
        try {
           const {userId} = req.params
           const users = await UserModel.findById(userId).populate(
                {
                    path: 'followings',
                    select: '_id'
                }
           )
           const posts = await PostModel.find({owner: { "$in": users.followings }}).populate({ path: 'owner', select: 'name avatar' }).sort({createdAt: -1})
           
           return res.json(posts)

        } catch (error) {
            next(createError(500, error.message))
        }
    },
    getPostsByUserId: async(req, res, next) => {
        try {
            const {userId} = req.params
            const user = await UserModel.findOne({_id: userId}).populate('posts')
            return res.status(200).json(user.posts.reverse())

        } catch (error) {
            next(createError(500, error.message))
        }
    },
    getPostById: async(req, res, next) => {
        try {
            const {postId} = req.params
            const post = await PostModel.findById(postId)
            if(post){
                return res.status(200).json({post}) 
            }
            throw createError(404, `Not found Post with id ${postId}`)
        } catch (error) {
            next(createError(500, error.message))
        }
    },
    updatePostByPostId: async(req, res, next) => {
        try {
            const {postId} = req.params
            const {owner} = req.body
            const newPost = await PostModel.findOneAndUpdate({_id: postId, owner}, req.body, {new: true})
            if(newPost){
                return res.status(200).json({newPost})
            }
            throw createError(404, `Not found Post`)

        } catch (error) {
            next(createError(500, error.message))
        }
    },
    deletePostByPostId: async(req, res, next) => {
        try {
            const {postId, owner} = req.params
            const result = await PostModel.findOneAndDelete({_id: postId, owner})
            if(!result) {
                return res.json('Post does not exist.')
            }

            // update data posts for user table
            const user = await UserModel.findById(owner)
            user.posts = user.posts.filter((post) => post != postId)
            user.totalPosts -= 1
            await user.save()

            return res.json("Delete post success")
        } catch (error) {
            next(createError(500, error.message))
        }
    },
    loveAndNotLoveThePost: async(req, res, next) => {
        try {
            const {postId} = req.params
            const {userId, ownerId} = req.body
            const user = await UserModel.findById(ownerId)
            if(!user) {
                return res.json("Error")
            }
            // post da duoc love
            const lovedThePost = await PostModel.findOne({
                _id: postId,
                userLoves: { $in: [userId]}
            })

            if(lovedThePost) {
                lovedThePost.totalLoves -= 1
                user.totalLoves -= 1
                lovedThePost.userLoves = lovedThePost.userLoves.filter(user => user != userId)
                await lovedThePost.save()
                await user.save()
                return res.json({loved: false})
            }
            
            // post chua duoc love
            const post = await PostModel.findById(postId)
            if(!post) {
                return res.json("Error")
            }
            post.totalLoves += 1
            user.totalLoves += 1
            post.userLoves.push(userId)
            
            await post.save()
            await user.save()
            return res.json({loved: true})

        } catch (error) {
            next(createError(500, error.message))
        }
    },
    getAllUserLovedPost: async(req, res, next) => {
        try {
            const {postId} = req.params
            const post = await PostModel.findById(postId).populate({ path: 'userLoves', select: 'name avatar' })
            if(post) {
                return res.status(200).json(post.userLoves)
            }
            return res.json('Error postID')
        } catch (error) {
            next(createError(500, error.message))
        }
    },
    createComment: async(req, res, next) => {
        try {
            const {postId} = req.params
            const {userComment, commentContent} = req.body
            const comments = { userComment, commentContent}
            const post = await PostModel.findById(postId)

            post.comments.push(comments)
            post.totalComments += 1
            await post.save()
            
            return res.json('created comment')
        } catch (error) {
            next(createError(500, error.message))
        }
    },
    getAllComments: async(req, res, next) => {
        try {
            const {postId} = req.params
            const post = await PostModel.findById(postId).populate({
                path: 'comments',
                populate: {
                    path: 'userComment',
                    select: 'name avatar' 
                }
            })
            
            return res.json(post.comments)

        } catch (error) {
            next(createError(500, error.message))
        }
    },
}

module.exports = postController