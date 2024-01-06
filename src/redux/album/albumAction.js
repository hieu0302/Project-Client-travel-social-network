import { createAsyncThunk } from "@reduxjs/toolkit";
import AlbumAPI from "../../services/albumAPI";

const FETCH_ALL_ALBUM = "app/fetch-all-album";

export const fetchAllAlbum = createAsyncThunk(
  FETCH_ALL_ALBUM,
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    const params = {
      page: payload?.page,
    };

    try {
      const response = await AlbumAPI.getAllAlbum(params);
      const payload = {
        albumData: response.data.data,
        pagination: response.data.pagination,
      };

      console.log("Response_ALBUM", response);

      return fulfillWithValue(payload);
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);
