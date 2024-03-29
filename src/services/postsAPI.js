import axios from "axios";
import api from "./axiosInstance.js";
const PostsAPI = {
  getALLPosts: (params) => {
    const { limit = 3, page = 1, sort = "desc" } = params;
    const url = `/posts?limit=${limit}&page=${page}&sort=${sort}`;
    return api.get(url);
  },
  // const url = `/posts?limit=${limit}&page=${page}&sort=${sort}`;

  createPost: (data) => {
    const url = "/posts";
    return api.post(url, data);
  },

  update: (id, data) => {
    const url = `/posts/${id}`;
    return api.put(url, data);
  },

  deleteByID: (id) => {
    const url = `/posts/${id}`;
    return api.delete(url);
  },

  getPostsBySearch: (params) => {
    const url = `/posts/search?q=${params}`;
    return api.get(url);
  },
};

export default PostsAPI;
