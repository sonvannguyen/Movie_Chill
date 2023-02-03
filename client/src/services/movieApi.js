import axios from "axios"

const BASE_URL = 'http://localhost:5000/admin/movieGroup'
const FOREIGN_URL = 'https://ophim1.com/phim/'

const movieApi = {
    getMoviesInGroup: async() => {
        try {
            const res = await axios.get(`${BASE_URL}`)
            return res.data
        } catch (error) {
            handleError(error)
        }
    },
    getMoviesByGroupName: async(movieGroupName) => {
        try {
            const res = await axios.get(`${BASE_URL}/${movieGroupName}`)
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