import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthenAPI from "../../services/authenAPI";
import UserAPI from "../../services/userAPI";

const FETCH_CURRENT_USER = "app/fetch-current-user";

// Async actions
export const fetchCurrentUser = createAsyncThunk(
  FETCH_CURRENT_USER,
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const currentUserResponse = await AuthenAPI.fetchCurrentUser();
      const currentUser = currentUserResponse.data;
      return fulfillWithValue(currentUser);
    } catch (error) {
      console.log("fetch-current-user-failed:", error);
      rejectWithValue(error);
    }
  }
);
