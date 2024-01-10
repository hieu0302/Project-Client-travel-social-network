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
  openModal: false,
  idAlbumOpendetail: [],
};

const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    deleteAlbum: (state, action) => {
      state.albumData = state.albumData.filter(
        (item) => item._id != action.payload
      );
    },
    createalbum: (state, action) => {
      state.albumData.unshift(action.payload);
    },
    openModal: (state, action) => {
      state.openModal = action.payload;
      console.log("OPEN::::???", state.openModal);
    },
    idAlbumOpenDetail: (state, action) => {
      state.idAlbumOpendetail = action.payload;
    },
    removeIdAlbum: (state, action) => {
      state.idAlbumOpendetail = action.payload;
    },
  },

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
