import { createSlice } from "@reduxjs/toolkit";
import { fetchAllPosts, fetchPostByUser } from "./postActions";

const initialState = {
  postsData: [],
  isLoading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postsData = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPostByUser.fulfilled, (state, action) => {
        state.isLoading = true
        state.postsData = action.payload
      });
  },
});

export default postsSlice.reducer;
