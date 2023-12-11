import api from "./axiosInstance";
const UploadImageAPI = {
  uploadImage: (body) => {
    const url = "/upload/images";
    return api.post(url, body, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  },
};
export default UploadImageAPI;
