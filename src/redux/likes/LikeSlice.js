import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllLike,
  fetchAllPostLiked,
  fetchCountLike,
} from "./LikeAction.js";

const initialState = {
  likeData: [],
  countLike: [],
  isLoading: false,
  postLiked: [],
  openModal: false,
};

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    createdLike: (state, action) => {
      state.postLiked.push(action.payload);
      const index = state.countLike.findIndex(
        (item) => item.idPost === action.payload
      );

      if (index !== -1) {
        state.countLike[index].countLike += 1;
      }
    },
    unLike: (state, action) => {
      state.postLiked = state.postLiked.filter(
        (item) => item !== action.payload
      );
      const index = state.countLike.findIndex(
        (item) => item.idPost === action.payload
      );

      if (index !== -1) {
        state.countLike[index].countLike -= 1;
      }
    },
    opneModal: (state, action) => {
      state.openModal = action.payload;
      // console.log("Idaid@#$#$#:::", state.openModal);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLike.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllLike.fulfilled, (state, { payload }) => {
        state.likeData = payload.likeData;
        state.isLoading = false;
      })
      .addCase(fetchAllLike.rejected, (state, action) => {
        (state.isLoading = false), (state.error = action.error.message);
      })
      .addCase(fetchCountLike.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCountLike.fulfilled, (state, { payload }) => {
        state.countLike.push(payload);
      })
      .addCase(fetchCountLike.rejected, (state, action) => {
        state.isLoadingCountLike = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllPostLiked.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllPostLiked.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload && payload.postLiked && payload.postLiked[0]) {
          state.postLiked.push(payload.postLiked[0].idPost);
        }
      })
      .addCase(fetchAllPostLiked.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const likeSliceAction = likeSlice.actions;

export default likeSlice.reducer;
