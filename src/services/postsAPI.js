import axios from "axios";
import api from "./axiosInstance";


const PostsAPI = {
  getALLPosts: () => {
    const url = "/posts";
    return api.get(url);
  },
  getPostsByUserId: () => {
    const url = `/posts/getPostByUserId`;
    return api.get(url);
  },
  getPostSave: () => {
    const url = `/posts/saved-posts`;
    return api.get(url);
  },
  putSavePost:(id) => {
    return api.put(`/posts/${id}/save`);
},

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

  
};

export default PostsAPI;
