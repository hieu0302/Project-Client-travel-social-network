import { createAsyncThunk } from "@reduxjs/toolkit";
import PostsAPI from "../../services/postsAPI";

// Types
const FETCH_ALL_POSTS = "app/fetch-all-posts";
const FETCH_POST_BY_USER = "app/fetch-by-user"
const FETCH_POST_SAVE = "app/fetch-posts-save"


// Async actions
export const fetchAllPosts = createAsyncThunk(
  FETCH_ALL_POSTS,
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await PostsAPI.getALLPosts(payload);
      const PostsData = response.data.data;
      return fulfillWithValue(PostsData);
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);

export const fetchPostByUser = createAsyncThunk(
  FETCH_POST_BY_USER,
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await PostsAPI.getPostsByUserId(payload);
      const PostsData = response.data.data;
      return fulfillWithValue(PostsData);
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);
export const fetchPostSaved = createAsyncThunk(
  FETCH_POST_SAVE,
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await PostsAPI.getPostSave(payload);
      const PostsData = response.data.data;
      return fulfillWithValue(PostsData);
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
)

