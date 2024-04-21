import axios from "axios";
import getConfigHeader from "./configHeader";

const BASE_URL_NOTIFICATION = "http://localhost:5000/notification";

const notificationApi = {
  getNotification: async (userId, action) => {
    try {
      const configHeader = getConfigHeader();
      const res = await axios.get(
        `${BASE_URL_NOTIFICATION}/user/${userId}/${action}`,
        configHeader
      );
      return res.data;
    } catch (err) {
      return err.message;
    }
  },
};

export default notificationApi;
