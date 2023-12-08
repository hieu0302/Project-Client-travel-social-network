import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  timeout: 10000,
});
const UploadImage = {
  uploadImage: (body) => {
    const url = "/upload/images";
    return api.post(url, body, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  },
};
export default UploadImage;
