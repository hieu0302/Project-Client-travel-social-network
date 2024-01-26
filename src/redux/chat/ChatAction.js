import { createAsyncThunk } from "@reduxjs/toolkit";
import ChatRoomAPI from "../../services/chatRoomAPI";
import MessageAPI from "../../services/messageApi";

const FETCH_ALL_CHATROOM = "app/fetch-all-chatroom";
const FETCH_ALL_MESSAGE = "app/fetch-all-message";

export const fetchAllChatRoom = createAsyncThunk(
  FETCH_ALL_CHATROOM,
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    const params = payload;
    try {
      const response = await ChatRoomAPI.getChatRoom(params);
      const payload = {
        chatRoom: response.data.chatRoom,
      };
      return fulfillWithValue(payload);
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);

export const fetchAllMessages = createAsyncThunk(
  FETCH_ALL_MESSAGE,
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    const params = payload;
    try {
      const response = await MessageAPI.getMessages(params);
      const payload = {
        messagesData: response.data.data,
      };
      console.log("PAYLOAD::::::", response);
      return fulfillWithValue(payload);
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);
