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
  tagUser: [],
  openModal: false,
  getIdPost: {},
  urlImage: [],
  indexPost: [],
  detailPostSearch: [],
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

    tagUserSave: (state, action) => {
      state.tagUser = action.payload;
    },

    openModal: (state, action) => {
      state.openModal = action.payload;
    },
    getIdPost: (state, action) => {
      state.getIdPost = action.payload;
    },
    getUrlImage: (state, action) => {
      state.urlImage = action.payload;
    },
    getIndexPost: (state, action) => {
      state.indexPost = action.payload;
    },
    updatePost: (state, action) => {
      state.postsData = action.payload;
    },
    detailPost: (state, action) => {
      state.detailPostSearch = action.payload;
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
