const MovieGroupModel = require('../models/MovieGroup')

const movieGroupController = {
    getAllGroupName: async(req, res, next) => {
        try {
            const listMovieGroup = await MovieGroupModel.find({})
            let listGroupName = []

            listMovieGroup.map((group) => {
                listGroupName.push(group.groupName)
            })

            return res.json({
                listGroupName
            })
        } catch (error) {
            next(error)
        }
    },
    createNewMovieGroup: async(req, res, next) => {
        try {
            const {groupName}= req.body
            const newMovieGroup = new MovieGroupModel({groupName})
            await newMovieGroup.save()

            return res.json({
                newMovieGroup
            })
        } catch (error) {
            next(error)
        }
    },
    addMovieToMovieGroup: async(req, res, next) => {
        try {
            const {groupName, movieId}= req.body
            const movieGroup = await MovieGroupModel.findOne({groupName})
            movieGroup.movieList.push(movieId)

            await movieGroup.save()
            return res.json({
                movieGroup
            })
        } catch (error) {
            next(error)
        }
    },
    getMoviesInMovieGroup: async(req, res, next) => {
        try {
            const {groupName} = req.params 
            const movieGroup = await MovieGroupModel.findOne({groupName}).populate({path: 'movieList'})

            const moviesData = movieGroup.movieList

            return res.json({
                moviesData
            })

        } catch (error) {
            next(error)
        }
    },
    updateGroupName: async(req, res, next) => {
        try {
            const {movieGroupId} = req.params
            const {groupName} = req.body
            
            const movieGroup = await MovieGroupModel.findByIdAndUpdate(movieGroupId, {groupName}, {new: true})
            
            return res.json(movieGroup)
            
        } catch (error) {
            next(error)
        }
    },
    deleteGroup: async(req, res, next) => {
        try {
            const {movieGroupId} = req.params
            await MovieGroupModel.findByIdAndDelete(movieGroupId)
            return res.json({message: "Delete group success"})

        } catch (error) {
            next(error)
        }
    },
    deleteMovieInGroup: async(req, res, next) => {
        
        try {
            const {movieGroupId, movieId} = req.params
            const movieGroup = await MovieGroupModel.findById(movieGroupId)

            movieGroup.movieList = movieGroup.movieList.filter(movie => movie._id 
            != movieId)

            await movieGroup.save()

            return res.json({
                movieGroup
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = movieGroupController
