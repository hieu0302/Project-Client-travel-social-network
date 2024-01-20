import { createSlice } from "@reduxjs/toolkit";
import { fetchAllNotify } from "./NotificationAction";

const initialState = {
  notifyData: [],
  isLoading: false,
};

const notifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNotify.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllNotify.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.notifyData = payload.notifyData;
        console.log(payload.notifyData);
      })
      .addCase(fetchAllNotify.rejected, (state, action) => {
        (state.isLoading = false), (state.error = action.error.message);
      });
  },
});

export const notifySliceAction = notifySlice.actions;
export default notifySlice.reducer;
