const createError = require('http-errors')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require('../models/User')

const userController = {
    register : async(req, res, next) => {
        try {
            const {username, password, gmail} = req.body
            if(!(username && password && gmail)){
                return res.json('All input is required')
            }

            const oldUsername = await UserModel.findOne({username})
            const oldGmail = await UserModel.findOne({gmail})
            if(oldUsername ) {
                return res.json('Username already exists.')
            }
            if(oldGmail) {
                return res.json('Gmail already exists.')
            }
            const salt = await bcrypt.genSalt(10);
            const passwordHashed = await bcrypt.hash(password, salt);
            
            const newUser = new UserModel({
                username,
                password: passwordHashed,
                gmail
            })
            
            await newUser.save()
            return res.status(200).json("Register success")
            
        } catch (error) {
            next(createError(500, error.message))
        }
    },
    login : async(req, res, next) => {
        try {
            const {username, password} = req.body
            const user = await UserModel.findOne({username});
            if (!user) {
                return res.json("Username or password is incorrect")
            }
            const isPasswordHashed = await bcrypt.compare(
                password,
                user.password
            );
            if(isPasswordHashed) {
                const accessToken = jwt.sign({userId: user._id, username: user.username}, process.env.JWT_SECRET, { expiresIn: "48h"})
                return res.status(200).json({user, accessToken})
            }
            else {
                return res.json("Username or password is incorrect")
            }

        } catch (error) {
            next(createError(500, error.message))
        }
    },
    getUserById: async(req, res, next) => {
        try {
            const {userId} = req.params
            const user = await UserModel.findById(userId).select('-password')
            if(user){
                return res.status(200).json({user})
            }
            throw createError(404, `Not found user with id ${userId}`)

        } catch (error) {
            next(createError(500, error.message))
        }
    },
    searchUserByUsername: async(req, res, next) => {
        try {
            const {username} = req.body

            const query = {
                $or: [
                    {
                        name: {
                            $regex: username, $options: "i"
                        }
                    },
                    {
                        username: {
                            $regex: username, $options: "i"
                        }
                    },
                ]
            }
            const user = await UserModel.find(query).select('avatar name username')
            const totalUserResult = await UserModel.countDocuments(query)

            if(totalUserResult > 0){
                return res.status(200).json(user)
            }
            return res.json(`Not found user ${username}`)
        } catch (error) {
            next(createError(500, error.message))
        }
    },
    updateUser: async(req, res, next) => {
        try {
            const {username} = req.body
            if(username){
                const oldUsername = await UserModel.findOne({username})
                if(oldUsername) {
                    return res.json('Username already exists.')
                }
            }
            const {userId} = req.params
            const newUser = await UserModel.findByIdAndUpdate(userId, req.body, {new: true})
            
            return res.json(newUser)

        } catch (error) {
            next(createError(500, error.message))
        }
    },
    deleteUser: async(req, res, next) => {
        try {
            const {userId} = req.params
            const result = await UserModel.findByIdAndDelete(userId)

            if(!result) {
                throw createError(404, 'User does not exist.')
            }
            res.status(200).json({message: "Delete success"})
            
        } catch (error) {
            next(createError(500, error.message))
        }
    },
    followOrUnFollow: async(req, res, next) => {
        try {
            const {userId, followId} = req.params
            const user = await UserModel.findById(userId)
            const followUser = await UserModel.findById(followId)

            if(!user || !followUser){
                return res.json("Not found user")
            }

            // case unFollow
            const userFollowed = await UserModel.findOne({
                _id: followId,
                followers: {$in: [userId]}
            })
            if(userFollowed) {
                followUser.totalFollowers -= 1
                followUser.followers = followUser.followers.filter(follower => follower.toString() != userId)

                user.totalFollowings -= 1
                user.followings = user.followings.filter(user => user.toString() != followId)

                await user.save()
                await followUser.save()
                return res.json({followed: false})
            }

            // case follow
            followUser.totalFollowers += 1
            followUser.followers.push(userId)

            user.totalFollowings += 1
            user.followings.push(followId)

            await user.save()
            await followUser.save()
            return res.json({followed: true})

        } catch (error) {
            next(createError(500, error.message))
        }
    },
    userViewProfile: async(req, res, next) => {
        try {
            const {userId, profileId} = req.params
            
            const viewedProfile = await UserModel.findOne({
                _id: profileId,
                usersViewProfile: {$in: [userId]}
            })
            if(viewedProfile || userId == profileId){
                return res.json(viewedProfile.usersViewProfile)
            } 

            const profile = await UserModel.findById(profileId)
            profile.usersViewProfile.push(userId)
            await profile.save()
            return res.json(profile.usersViewProfile)

        } catch (error) {
            next(createError(500, error.message))
        }
    },
    getUsersViewProfile: async(req, res, next) => {
        try {
            const {userId} = req.params
            
            const user = await UserModel.findById(userId).populate({
                path: 'usersViewProfile', 
                select: 'name avatar username' 
            })

            return res.json(user.usersViewProfile)

        } catch (error) {
            next(createError(500, error.message))
        }
    },
    getFollowerList: async(req, res, next) => {
        try {
            const {userId} = req.params
            const followerList = await UserModel.findById(userId).populate({
                path: 'followers', 
                select: 'name avatar username' 
            })
            return res.json(followerList.followers)
        } catch (error) {
            next(createError(500, error.message))
        }
    },
    getFollowingList: async(req, res, next) => {
        try {
            const {userId} = req.params
            const followingList = await UserModel.findById(userId).populate({
                path: 'followings', 
                select: 'name avatar username' 
            })
            return res.json(followingList.followings)
        } catch (error) {
            next(createError(500, error.message))
        }
    },
}

module.exports = userController