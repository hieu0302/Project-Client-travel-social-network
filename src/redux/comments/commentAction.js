import { createAsyncThunk } from "@reduxjs/toolkit";
import CommentAPI from "../../services/commentAPI";

const FETCH_ALL_COMMENT = "app/fetch-all-comment";
const FETCH_COMMENT_BY_PAGE = "app/fetch-comment-by-page";

export const fetchAllComment = createAsyncThunk(
  FETCH_ALL_COMMENT,
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    const params = payload;

    try {
      const response = await CommentAPI.getComment(params);
      const payload = {
        commentData: response.data,
      };
      return fulfillWithValue(payload);
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);

export const fetchCommentByPage = createAsyncThunk(
  FETCH_COMMENT_BY_PAGE,
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    const params = payload;
    

    console.log("Response_ALBUM", params);
    try {
      const response = await CommentAPI.getCommentByPage(params);
      const payload = {
        commentDataByPage: response?.data.data,
        pagination: response?.data.pagination,
      };
      return fulfillWithValue(payload);
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);


