import { createSlice } from "@reduxjs/toolkit";
import { fetchAllAlbum } from "./albumAction";

const initialState = {
  albumData: [],
  isLoading: false,
  error: null,
  fetchAlbumPending: false,
  fetchAlbumError: null,
  pagination: {},
  albumId: [],
};

const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAlbum.pending, (state) => {
        state.isLoading = true;
        state.fetchAlbumPending = true;
        state.fetchAlbumError = null;
      })
      .addCase(fetchAllAlbum.fulfilled, (state, { payload }) => {
        state.fetchAlbumPending = false;
        if (
          state.pagination?.currentPage !== payload?.pagination?.currentPage
        ) {
          const newResult = [...state.albumData];
          payload.albumData?.forEach((item) => {
            if (!state.albumData.find((x) => x._id == item._id)) {
              newResult.push(item);
              state.pagination = payload.pagination;
            }
          });

          state.albumId = [...payload.albumData.map((item) => item._id)];
          state.albumData = newResult;
        }
      })
      .addCase(fetchAllAlbum.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const albumSliceAction = albumSlice.actions;
export default albumSlice.reducer;
