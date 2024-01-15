import api from "./axiosInstance";

const UserAPI = {
  getOne: (id) => {
    const url = `/users/${id}`;
    return api.get(url);
  },
  update: ( data) => {
    const url = `/user`;
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
};

export default UserAPI;
