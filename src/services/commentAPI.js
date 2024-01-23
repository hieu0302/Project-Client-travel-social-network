import api from "./axiosInstance";

const CommentAPI = {
  createComent: (data) => {
    const url = "/comment";
    return api.post(url, data);
  },

  getComment: (id) => {
    const url = `/comment/${id}`;
    return api.get(url);
  },

  getCommentByID: (id) => {
    const url = "/comment";
    const params = { id: id };
    return api.get(url, { params });
  },
  getCommentByPage: (params) => {
    const { idPost, limit = 2, page = 1, sort = "desc" } = params;
    const url = `/comment/byPage?idPost=${idPost}&limit=${limit}&page=${page}&sort=${sort}`;
    return api.get(url);
  },

  deleteComment: (id) => {
    const url = `/comment/${id}`;
    return api.delete(url);
  },
};

export default CommentAPI;
