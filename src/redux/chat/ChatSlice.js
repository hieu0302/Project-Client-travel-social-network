import { createSlice } from "@reduxjs/toolkit";
import { fetchAllChatRoom, fetchAllMessages } from "./ChatAction";

const initialState = {
  chatRoom: [],
  isLoading: false,
  messagesData: [],
  idRoomChat: {},
  infoReceiver: [],
  notyfyMessage: [],
  pendingMessage: [],
  deleteNavNumber: "",
};

const chatRoomSlice = createSlice({
  name: "chatRoom",
  initialState,
  reducers: {
    createRoomChat: (state, action) => {
      state.chatRoom.unshift(action.payload);
    },

    deleteRoomChat: (state, action) => {
      state.chatRoom = state.chatRoom.filter(
        (item) => item._id !== action.payload
      );
    },
    getIdRoomChat: (state, action) => {
      state.idRoomChat = action.payload;
    },

    createMessage: (state, action) => {
      state.messagesData.unshift(action.payload);
    },

    getReceiver: (state, action) => {
      state.infoReceiver = action.payload;
    },
    getNotifyMessage: (state, action) => {
      // state.notyfyMessage.push(action.payload);
      return {
        ...state,
        notyfyMessage: [...state.notyfyMessage, action.payload],
      };
    },
    getPendingMessage: (state, action) => {
      state.pendingMessage = action.payload;
    },
    deleteNotifyNumber: (state, action) => {
      state.notyfyMessage = state.notyfyMessage.filter(
        (i) => i.idRoomChat !== action.payload
      );
      console.log("NOTIFY", state.notyfyMessage);
    },
    deletePendingNumber: (state, action) => {
      state.pendingMessage = state?.pendingMessage?.filter(
        (item) => item.idRoomChat !== action.payload
      );
    },
    deleteNumberNav: (state, action) => {
      state.deleteNavNumber = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllChatRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllChatRoom.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.chatRoom = payload.chatRoom;
      })
      .addCase(fetchAllChatRoom.rejected, (state, action) => {
        (state.isLoading = false), (state.error = action.error.message);
      })
      .addCase(fetchAllMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllMessages.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.messagesData = payload.messagesData;
      })
      .addCase(fetchAllMessages.rejected, (state, action) => {
        (state.isLoading = false), (state.error = action.error.message);
      });
  },
});

export const chatRoomSliceAction = chatRoomSlice.actions;
export default chatRoomSlice.reducer;
