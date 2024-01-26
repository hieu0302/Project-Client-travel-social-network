import { createAsyncThunk } from "@reduxjs/toolkit";
import NotifyAPI from "../../services/notifyAPI";

const FETCH_ALL_NOTIFY = "app/fetch-all-notify";

export const fetchAllNotify = createAsyncThunk(
  FETCH_ALL_NOTIFY,
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    const params = payload;

    try {
      const response = await NotifyAPI.getNotify(params);
      const payload = {
        notifyData: response.data.data,
      };
      return fulfillWithValue(payload);
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);
