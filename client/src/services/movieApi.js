import axios from "axios"

const BASE_URL_MOVIEGR = 'http://localhost:5000/admin/movieGroup'
const BASE_URL_MOVIE = 'http://localhost:5000/movie'

const FOREIGN_URL = 'https://ophim1.com/phim/'

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
            const res = await axios.get(`${FOREIGN_URL}/${movieSlug}`)
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
            const newSearch = search.replace(/page=\d+/, "page=")
            const res = await axios.get(`${BASE_URL_MOVIE}/filter${newSearch}${page}`)
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