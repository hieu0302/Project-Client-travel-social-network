import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
});

export const signUp = (data) => {
  return axiosInstance.post("/api/v1/auth/signup", data);
};
