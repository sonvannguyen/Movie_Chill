const createError = require('http-errors')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require('../models/User')

const userController = {
    register : async(req, res, next) => {
        try {
            const {username, password} = req.body
            if(!(username && password)){
                return res.json('All input is required')
            }

            const oldUsername = await UserModel.findOne({username})
            if(oldUsername ) {
                return res.json('Username already exists.')
            }

            const salt = await bcrypt.genSalt(10);
            const passwordHashed = await bcrypt.hash(password, salt);
            
            const newUser = new UserModel({
                username,
                password: passwordHashed,
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
            const user = await UserModel.findOne({username})
            if (!user) {
                return res.json("Username or password is incorrect")
            }
            const isPasswordHashed = await bcrypt.compare(
                password,
                user.password
            )
            
            if(isPasswordHashed) {
                const accessToken = jwt.sign(
                    {userId: user._id, username: user.username},
                    process.env.JWT_SECRET,
                    { expiresIn: "4h"}
                )
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
            console.log(req.params)
            const user = await UserModel.findById(userId).select('-password')
            if(user){
                console.log(user)
                return res.status(200).json({user})
            }
            throw createError(404, `Not found user with id ${userId}`)

        } catch (error) {
            next(createError(500, error.message))
        }
    },
    addMovieToListMoviesWatched: async(req, res, next) => {
        try {
            const {userId, movieId} = req.body
            const user = await UserModel.findById(userId)

            if(!user){
                return res.status(404).json('Not found user !')
            }

            if(user.moviesWatched.includes(movieId)){
                return res.status(409).json('Movie already exist !')
            }

            user.moviesWatched.push(movieId)
            await user.save()

            return res.status(200).json(user.moviesWatched)

        } catch (error) {
            next(createError(500, error.message))
        }
    },
    getMoviesFromListMoviesWatched: async(req, res, next) => {
        try {
            const {userId} = req.params
            const moviesData = await UserModel.findById(userId).populate({
                path: 'moviesWatched', 
            })

            return res.status(200).json(moviesData.moviesWatched)

        } catch (error) {
            next(createError(500, error.message))
        }
    },
    deleteMovieFromMoviesWatched: async(req, res, next) => {
        try {
            const {userId, movieId} = req.params
            const user = await UserModel.findById(userId)

            if(!user){
                return res.status(404).json('Not found user')
            }

            user.moviesWatched = user.moviesWatched.filter(movie => movie != movieId)
            await user.save()

            return res.status(200).json(user.moviesWatched)

        } catch (error) {
            next(createError(500, error.message))
        }
    },
    deleteAllMovieFromMoviesWatched: async(req, res, next) => {
        try {
            const {userId} = req.params
            const user = await UserModel.findById(userId)

            if(!user){
                return res.status(404).json('Not found user')
            }

            user.moviesWatched = []
            await user.save()

            return res.status(200).json(user.moviesWatched)

        } catch (error) {
            next(createError(500, error.message))
        }
    },
    addMovieToListMoviesBookmark: async(req, res, next) => {
        try {
            const {userId, movieId} = req.body
            const user = await UserModel.findById(userId)

            if(!user){
                return res.status(404).json('Not found user !')
            }

            if(user.moviesBookmarks.includes(movieId)){
                return res.status(409).json('Movie already exist !')
            }

            user.moviesBookmarks.push(movieId)
            await user.save()

            return res.status(200).json(user.moviesBookmarks)

        } catch (error) {
            next(createError(500, error.message))
        }
    },
    getMoviesFromListMoviesBookmark: async(req, res, next) => {
        try {
            const {userId} = req.params
            const moviesData = await UserModel.findById(userId).populate({
                path: 'moviesBookmarks', 
            })

            return res.status(200).json(moviesData.moviesBookmarks.reverse())

        } catch (error) {
            next(createError(500, error.message))
        }
    },
    deleteMovieFromMoviesBookmark: async(req, res, next) => {
        try {
            const {userId, movieId} = req.params
            const user = await UserModel.findById(userId)

            if(!user){
                return res.status(400).json('Not found user')
            }

            user.moviesBookmarks = user.moviesBookmarks.filter(movie => movie != movieId)
            await user.save()

            return res.status(200).json(user.moviesBookmarks)

        } catch (error) {
            next(createError(500, error.message))
        }
    },
    deleteAllMovieFromMoviesBookmark: async(req, res, next) => {
        try {
            const {userId} = req.params
            const user = await UserModel.findById(userId)

            if(!user){
                return res.status(404).json('Not found user')
            }

            user.moviesBookmarks = []
            await user.save()

            return res.status(200).json(user.moviesBookmarks)

        } catch (error) {
            next(createError(500, error.message))
        }
    },

}

module.exports = userController