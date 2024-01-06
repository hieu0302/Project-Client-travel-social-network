import api from "./axiosInstance";

const AlbumAPI = {
  getAllAlbum: (params) => {
    const { limit = 3, page = 1, sort = "desc" } = params;
    const url = `/album?limit=${limit}&page=${page}&sort=${sort}`;
    return api.get(url);
  },
  createAlbum: (data) => {
    const url = "/album";
    return api.post(url, data);
  },
  updateAlbum: (id, data) => {
    const url = `/album/${id}`;
    return api.put(url, data);
  },

  deleteByID: (id) => {
    const url = `/album/${id}`;
    return api.delete(url);
  },
};

export default AlbumAPI;
