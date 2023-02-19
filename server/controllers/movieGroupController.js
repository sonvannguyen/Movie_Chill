const MovieGroupModel = require('../models/MovieGroup')
const UserModel = require('../models/User')

const movieGroupController = {
    getAllGroup: async(req, res, next) => {
        try {
            const dataMoviesGroup = await MovieGroupModel.find({})
            .populate({path: 'movieList', select: '-episodes -comments'})
            return res.json(dataMoviesGroup)
        } catch (error) {
            next(error)
        }
    },
    createNewMovieGroup: async(req, res, next) => {
        try {
            const {groupName}= req.body
            const userId = req.userId
            const user = await UserModel.findById(userId)

            if(user && user.isAdmin){
                const newMovieGroup = new MovieGroupModel({groupName})
                await newMovieGroup.save()
    
                return res.json({
                    newMovieGroup
                })
            }
            else {
                return res.json('Only admin can do it !')
            }
        } catch (error) {
            next(error)
        }
    },
    addMovieToMovieGroup: async(req, res, next) => {
        try {
            const {groupName, movieId}= req.body
            const userId = req.userId
            const user = await UserModel.findById(userId)

            if(user && user.isAdmin){
                const movieGroup = await MovieGroupModel.findOne({groupName})
                movieGroup.movieList.push(movieId)
    
                await movieGroup.save()
                return res.json({
                    movieGroup
                })
            }
            else {
                return res.json('Only admin can do it !')
            }
            
        } catch (error) {
            next(error)
        }
    },
    getMoviesInMovieGroup: async(req, res, next) => {
        try {
            const {groupName} = req.params 
            const movieGroup = await MovieGroupModel.findOne({groupName}).populate({path: 'movieList'})
            if(!movieGroup){
                return res.json('Không có group movie nào phù hợp')
            }
            
            const moviesData = movieGroup.movieList
            return res.json(moviesData)

        } catch (error) {
            next(error)
        }
    },
    updateGroupName: async(req, res, next) => {
        try {
            const {movieGroupId} = req.params
            const {groupName} = req.body
            const userId = req.userId

            const user = await UserModel.findById(userId)
            if(user && user.isAdmin){
                const movieGroup = await MovieGroupModel.findByIdAndUpdate(movieGroupId, {groupName}, {new: true})
                return res.json(movieGroup)
            }
            else {
                return res.json('Only admin can do it !')
            }
            
        } catch (error) {
            next(error)
        }
    },
    deleteGroup: async(req, res, next) => {
        try {
            const {movieGroupId} = req.params
            const userId = req.userId

            const user = await UserModel.findById(userId)
            if(user && user.isAdmin){
                await MovieGroupModel.findByIdAndDelete(movieGroupId)
                return res.json({message: "Delete group success"})
            }
            else {
                return res.json('Only admin can do it !')
            }
        } catch (error) {
            next(error)
        }
    },
    deleteMovieInGroup: async(req, res, next) => {
        try {
            const {movieGroupId, movieId} = req.params
            const userId = req.userId

            const user = await UserModel.findById(userId)
            if(user && user.isAdmin){
                const movieGroup = await MovieGroupModel.findById(movieGroupId)
    
                movieGroup.movieList = movieGroup.movieList.filter(movie => movie._id 
                != movieId)
    
                await movieGroup.save()
    
                return res.json({
                    movieGroup
                })
            }
            else {
                return res.json('Only admin can do it !')
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = movieGroupController
