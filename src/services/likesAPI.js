import api from "./axiosInstance";

const LikeAPI = {
  createLike: (data) => {
    const url = "/like";
    return api.post(url, data);
  },

  getLikeByPost: (id) => {
    const url = `/like/${id}`;
    return api.get(url);
  },

  getAllPostLiked: (params) => {
    const { idPost, idUser } = params;
    const url = `/like?idPost=${idPost}&idUser=${idUser}`;
    return api.get(url);
  },

  getCountLike: (id) => {
    const url = `/like/count/${id}`;
    return api.get(url);
  },

  deleteLike: (params) => {
    const { idPost, idUser } = params;
    const url = `/like/delete?idPost=${idPost}&idUser=${idUser}`;
    return api.delete(url);
  },
};

export default LikeAPI;
