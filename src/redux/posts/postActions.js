import { createAsyncThunk } from "@reduxjs/toolkit";
import PostsAPI from "../../services/postsAPI";

// Types
const FETCH_ALL_POSTS = "app/fetch-all-posts";

// Async actions
export const fetchAllPosts = createAsyncThunk(
  FETCH_ALL_POSTS,
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    const params = {
      page: payload?.page,
    };

    try {
      const response = await PostsAPI.getALLPosts(params);
      const payload = {
        postsData: response.data.data,
        pagination: response.data.pagination,
      };

      return fulfillWithValue(payload);
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);
