import { createSlice } from "@reduxjs/toolkit";
import { fetchAllComment } from "./commentAction";

const initialState = {
  commentData: [],
  fetchPostPending: false,
  isLoading: false,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    createComment: (state, action) => {
      state.commentData.push(action.payload);
    },
    deleteComment: (state, action) => {
      state.commentData = state.commentData.filter(
        (item) => item._id != action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllComment.pending, (state) => {
        state.fetchPostPending = true;
        state.isLoading = true;
      })
      .addCase(fetchAllComment.fulfilled, (state, { payload }) => {
        // state.fetchPostPending = false;
        // const newResult = [...state.commentData];
        // payload.commentData?.forEach((item) => {
        //   if (!state.commentData.find((x) => x._id == item._id)) {
        //     newResult.push(item);
        //   }
        // });

        // state.commentData = newResult;
        state.commentData = [...state.commentData, ...payload.commentData];
      })
      .addCase(fetchAllComment.rejected, (state, action) => {
        (state.isLoading = false), (state.error = action.error.message);
      });
  },
});

export const commentSliceAction = commentSlice.actions;

export default commentSlice.reducer;
