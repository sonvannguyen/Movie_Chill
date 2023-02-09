import axios from "axios"

const BASE_URL_USER = 'http://localhost:5000/user'

const userApi = {
    register: async(userData) => {
        try {
            console.log(userData)
            const res = await axios.post(`${BASE_URL_USER}/register`, userData )
            return res.data
        } catch(err) {
            return err.message
        }
    },
    login : async (userData) => {
        try {
            const res = await axios.post(`${BASE_URL_USER}/login`, userData)
            return res.data
        } catch(err) {
            return err.message
        }
    },
    // getMoviesWatched: async () => {
    //     try {
    //         const res = await axios.get(`${BASE_URL_USER}/login`, userData)
    //         return res.data
    //     } catch(err) {
    //         return err.message
    //     }
    // },

}

export default userApi