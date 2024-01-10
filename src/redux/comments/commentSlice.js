import { createSlice } from "@reduxjs/toolkit";
import { fetchAllComment, fetchCommentByPage } from "./commentAction";

const initialState = {
  commentData: [],
  fetchPostPending: false,
  isLoading: false,
  commentDataByPage: [],
  pagination: [],
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
    removeCommentData: (state, action) => {
      state.commentDataByPage = action.payload;
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
      })

      .addCase(fetchCommentByPage.pending, (state) => {
        state.fetchPostPending = true;
        state.isLoading = true;
      })

      .addCase(fetchCommentByPage.fulfilled, (state, { payload }) => {
        state.fetchPostPending = false;
        // if (
        //   state.pagination?.currentPage !== payload?.pagination?.currentPage
        // ) {
        const newResult = [...state.commentDataByPage];
        payload.commentDataByPage?.forEach((item) => {
          if (!state.commentDataByPage.find((x) => x._id == item._id)) {
            newResult.push(item);
            state.pagination = payload.pagination;
          }
        });
        state.commentDataByPage = newResult;
        // }
      })
      .addCase(fetchCommentByPage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const commentSliceAction = commentSlice.actions;

export default commentSlice.reducer;
