import api from "./axiosInstance";

const ChatRoomAPI = {
  createChatRoom: (data) => {
    const url = "/chat-room";
    return api.post(url, data);
  },

  getChatRoom: (params) => {
    const { idUser } = params;
    const url = `/chat-room?idUser=${idUser}`;
    return api.get(url);
  },

  deleteChatRoom: (id) => {
    const url = `/chat-room/${id}`;
    return api.delete(url);
  },
};

export default ChatRoomAPI;
