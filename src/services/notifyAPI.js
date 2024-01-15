import api from "./axiosInstance";

const NotifyAPI = {
  createNotify: (data) => {
    const url = "/notify";
    return api.post(url, data);
  },

  getNotify: (params) => {
    const { idPost } = params;
    const url = `/notify?idPost=${idPost}`;
    return api.get(url);
  },

  deleteNotify: (id) => {
    const url = `/notify/${id}`;
    return api.delete(url);
  },
};

export default NotifyAPI;
