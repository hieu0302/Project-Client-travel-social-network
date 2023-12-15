import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  timeout: 10000,
});
const PostsAPI = {
  getALLPosts: () => {
    const url = "/posts";
    return api.get(url);
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
