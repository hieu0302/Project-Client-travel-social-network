import { createAsyncThunk } from "@reduxjs/toolkit";
import CommentAPI from "../../services/commentAPI";

const FETCH_ALL_COMMENT = "app/fetch-all-comment";

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
