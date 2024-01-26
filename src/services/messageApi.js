import api from "./axiosInstance";

const MessageAPI = {
  createMessage: (data) => {
    const url = "/message";
    return api.post(url, data);
  },

  getMessages: (params) => {
    const { idRoomChat } = params;
    const url = `/message?idRoomChat=${idRoomChat}`;
    return api.get(url);
  },

  deleteMessage: (id) => {
    const url = `/message/${id}`;
    return api.delete(url);
  },
};

export default MessageAPI;
