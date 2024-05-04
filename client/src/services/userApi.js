import axios from "axios";
import getConfigHeader from "./configHeader";

const BASE_URL_USER = "http://localhost:5000/user";

const userApi = {
  register: async (userData) => {
    try {
      const res = await axios.post(`${BASE_URL_USER}/register`, userData);
      return res.data;
    } catch (err) {
      return err.message;
    }
  },
  login: async (userData) => {
    try {
      const res = await axios.post(`${BASE_URL_USER}/login`, userData);
      return res.data;
    } catch (err) {
      return err.message;
    }
  },
  getUserById: async (userId) => {
    try {
      const configHeader = getConfigHeader();
      const res = await axios.get(`${BASE_URL_USER}/${userId}`, configHeader);
      console.log(`${BASE_URL_USER}/${userId}`);
      return res.data;
    } catch (err) {
      return err.message;
    }
  },
  updateUserInfo: async (userInfo) => {
    try {
      const configHeader = getConfigHeader();
      const res = await axios.post(
        `${BASE_URL_USER}/update-info`,
        userInfo,
        configHeader
      );
      return res.data;
    } catch (err) {
      return err.message;
    }
  },
  getMoviesFromListMoviesBookmark: async (userId) => {
    try {
      const configHeader = getConfigHeader();
      const res = await axios.get(
        `${BASE_URL_USER}/bookmarked/${userId}`,
        configHeader
      );
      return res.data;
    } catch (err) {
      return err.message;
    }
  },
  addMovieToMoviesBookmark: async (movieData) => {
    try {
      const configHeader = getConfigHeader();
      const res = await axios.post(
        `${BASE_URL_USER}/add/bookmark`,
        movieData,
        configHeader
      );
      return res.data;
    } catch (err) {
      return err.message;
    }
  },
  deleteAllBookmarks: async (userId) => {
    try {
      const configHeader = getConfigHeader();
      const res = await axios.delete(
        `${BASE_URL_USER}/${userId}/delete/all/bookmarked`,
        configHeader
      );
      return res.data;
    } catch (err) {
      return err.message;
    }
  },
  deleteAMovieInBookmarks: async ({ userId, movieId }) => {
    try {
      const configHeader = getConfigHeader();
      const res = await axios.delete(
        `${BASE_URL_USER}/${userId}/delete/bookmarked/${movieId}`,
        configHeader
      );
      return res.data;
    } catch (err) {
      return err.message;
    }
  },

  getMoviesFromHistory: async (userId) => {
    try {
      const configHeader = getConfigHeader();
      const res = await axios.get(
        `${BASE_URL_USER}/history/${userId}`,
        configHeader
      );
      return res.data;
    } catch (err) {
      return err.message;
    }
  },
  addMovieToHistory: async (movieData) => {
    try {
      const configHeader = getConfigHeader();
      const res = await axios.post(
        `${BASE_URL_USER}/add/history`,
        movieData,
        configHeader
      );
      return res.data;
    } catch (err) {
      return err.message;
    }
  },
  deleteAllHistory: async (userId) => {
    try {
      const configHeader = getConfigHeader();
      const res = await axios.delete(
        `${BASE_URL_USER}/${userId}/delete/all/history`,
        configHeader
      );
      return res.data;
    } catch (err) {
      return err.message;
    }
  },
  deleteAMovieInHistory: async ({ userId, movieId }) => {
    try {
      const configHeader = getConfigHeader();
      const res = await axios.delete(
        `${BASE_URL_USER}/${userId}/delete/history/${movieId}`,
        configHeader
      );
      return res.data;
    } catch (err) {
      return err.message;
    }
  },
  createNewComment: async (commentData) => {
    const configHeader = getConfigHeader();
    const res = await axios.post(
      `${BASE_URL_USER}/create/comment`,
      commentData,
      configHeader
    );
    return res.data;
  },
  deleteComment: async ({ movieId, commentId }) => {
    const configHeader = getConfigHeader();
    const res = await axios.delete(
      `${BASE_URL_USER}/delete/comment/${commentId}`,
      configHeader
    );
    return res.data;
  },
  reportComment: async (dataReport) => {
    const configHeader = getConfigHeader();
    const res = await axios.post(
      `${BASE_URL_USER}/report/comment`,
      dataReport,
      configHeader
    );
    return res.data;
  },
  followMovie: async (dataFollow) => {
    const configHeader = getConfigHeader();
    const res = await axios.post(
      `${BASE_URL_USER}/follow`,
      dataFollow,
      configHeader
    );
    return res.data;
  },
};

export default userApi;
