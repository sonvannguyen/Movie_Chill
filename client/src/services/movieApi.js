import axios from "axios"
import configHeader from "./configHeader"

const BASE_URL_MOVIEGR = 'http://localhost:5000/admin/movieGroup'
const BASE_URL_MOVIE = 'http://localhost:5000/movie'

const movieApi = {
    getMoviesInGroup: async() => {
        try {
            const res = await axios.get(`${BASE_URL_MOVIEGR}`)
            return res.data
        } catch (error) {
            handleError(error)
        }
    },
    getMoviesByGroupName: async(movieGroupName) => {
        try {
            const res = await axios.get(`${BASE_URL_MOVIEGR}/${movieGroupName}`)
            return res.data
        } catch (error) {
            handleError(error)
        }
    },
    getMovieDetail: async(movieSlug) => {
        try {
            const res = await axios.get(`${BASE_URL_MOVIE}/detail/${movieSlug}`)
            return res.data
        } catch (error) {
            handleError(error)
        }
    },
    searchMovie: async({movieName, page}) => {
        try {
            const res = await axios.get(`${BASE_URL_MOVIE}/search?movieName=${movieName}&page=${page}`)
            return res.data
        } catch (error) {
            handleError(error)
        }
    },
    filterMovie: async({search, page}) => {
        try {
            let res = {}
            if(search.includes('page=')){
                const newSearch = search.replace(/page=\d+/, "page=")
                res = await axios.get(`${BASE_URL_MOVIE}/filter${newSearch}${page}`)
            }
            else {
                res = await axios.get(`${BASE_URL_MOVIE}/filter${search}`)
            }
            return res.data
        } catch (error) {
            handleError(error)
        }
    },
    getMovieRecommend: async(filter) => {
        try {
            const {type, category, country} = filter
            const res = await axios.get(`${BASE_URL_MOVIE}/filter?type=${type}&category=${category}&country=${country}`)
            return res.data
        } catch (error) {
            handleError(error)
        }
    },
    createNewComment: async(commentData) => {
        try {
            const res = await axios.post(`${BASE_URL_MOVIE}/create/comment`, commentData, configHeader)
            return res.data
        } catch (error) {
            handleError(error)
        }
    },
    deleteComment: async({movieId, commentId}) => {
        try {
            const res = await axios.delete(`${BASE_URL_MOVIE}/${movieId}/comment/${commentId}`, configHeader)
            return res.data
        } catch (error) {
            handleError(error)
        }
    },
}

const handleError = (err) => {
    if(err.response.data.message) {
        throw new Error(err.response.data.message)   // TH lôi dc backend tra ve
    }
    else {
        throw new Error(err.message) // TH lôi khi truy van
    }
}
export default movieApi