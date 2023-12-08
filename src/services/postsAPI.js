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
};

export default PostsAPI;
