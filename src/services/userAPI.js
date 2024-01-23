import api from "./axiosInstance";

const UserAPI = {
  getOne: (id) => {
    const url = `/users/${id}`;
    return api.get(url);
  },
  update: (id, data) => {
    const url = `/users/${id}`;
    return api.put(url, data);
  },
  getLikes: (id) => {
    const url = `/users/${id}/likes`;
    return api.get(url);
  },
  changePassword: (id, data) => {
    const url = `/users/${id}/changePassword`;
    return api.put(url, data);
  },
  getInfoUserBySearch: (params) => {
    const url = `/users/search-user?q=${params}`;
    return api.get(url);
  },

};

export default UserAPI;
