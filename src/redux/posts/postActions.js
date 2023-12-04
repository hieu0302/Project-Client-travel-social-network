import { createAsyncThunk } from "@reduxjs/toolkit";
import PostsAPI from "../../services/postsAPI";

// Types
const FETCH_ALL_POSTS = "app/fetch-all-posts";

// Async actions
export const fetchAllPosts = createAsyncThunk(
  FETCH_ALL_POSTS,
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await PostsAPI.getAllOfPage(payload);
      const PostsData = response.data.data;
      return fulfillWithValue(PostsData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      rejectWithValue(error);
    }
  }
);
