import { createSlice } from "@reduxjs/toolkit";
import { fetchAllPosts } from "./postActions";

const initialState = {
  postsData: [],
  isLoading: false,
  error: null,
  fetchPostPending: false,
  fetchPostError: null,
  postId: [],
  pagination: {},
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    deletePost: (state, action) => {
      state.postsData = state.postsData.filter(
        (item) => item._id != action.payload
      );
    },

    createPost: (state, action) => {
      state.postsData.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.isLoading = true;
        state.fetchPostPending = true;
        state.fetchPostError = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, { payload }) => {
        state.fetchPostPending = false;
        if (
          state.pagination?.currentPage !== payload?.pagination?.currentPage
        ) {
          const newResult = [...state.postsData];
          payload.postsData?.forEach((item) => {
            if (!state.postsData.find((x) => x._id == item._id)) {
              newResult.push(item);
              state.pagination = payload.pagination;
            }
          });

          state.postId = [...payload.postsData.map((item) => item._id)];
          state.postsData = newResult;
        }
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const postSliceAction = postsSlice.actions;

export default postsSlice.reducer;
