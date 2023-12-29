import { createAsyncThunk } from "@reduxjs/toolkit";
import LikeAPI from "../../services/likesAPI";

const FETCH_ALL_LIKE = "app/fetch-all-like";
const FETCH_COUNT_LIKE = "app/fetch-count-like";
const FETCH_ALL_POST_LIKED = "app/fetch-all-post-liked";

export const fetchAllLike = createAsyncThunk(
  FETCH_ALL_LIKE,
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    const params = payload;

    console.log("6098790645", payload);

    try {
      const response = await LikeAPI.getLikeByPost(params);
      const payload = {
        likeData: response.data.data,
        totalLike: response.data.totalLike,
      };
      return fulfillWithValue(payload);
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);

export const fetchCountLike = createAsyncThunk(
  FETCH_COUNT_LIKE,
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    const params = payload;

    try {
      const response = await LikeAPI.getCountLike(params);
      const payload = {
        countLike: response.data.data,
        idPost: response.data.idPost,
      };

      return fulfillWithValue(payload);
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);

export const fetchAllPostLiked = createAsyncThunk(
  FETCH_ALL_POST_LIKED,
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    const params = payload;

    try {
      const response = await LikeAPI.getAllPostLiked(params);
      const payload = {
        postLiked: response.data.data,
      };

      return fulfillWithValue(payload);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
