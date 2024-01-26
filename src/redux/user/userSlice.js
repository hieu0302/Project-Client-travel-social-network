import { createSlice } from "@reduxjs/toolkit";
import { fetchCurrentUser } from "./userActions";


const initialState = {
  isAuthenticated: false,
  error: null,
  fetchCurrentUserPending: false,
  fetchCurrentUserError: null,
  currentUser: {},
  socket: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("accessToken");
      state.isAuthenticated = false;
    },
    addNewSocket: (state, { payload }) => {
      state.socket = payload.action;
    },
    
  },
  extraReducers: (builder) => {
    // Handle async action
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.fetchCurrentUserPending = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
        state.isAuthenticated = true;
        state.fetchCurrentUserPending = false;
      })
      .addCase(fetchCurrentUser.rejected, (state, { payload }) => {
        state.fetchCurrentUserPending = false;
        state.isAuthenticated = false;
        state.fetchCurrentUserError = payload;
      });
  },
});

export const authSliceAction = authSlice.actions;

export default authSlice.reducer;

// const PATH = {
//   LOGIN: "/login",
// };

// const initialState = {
//   isAuthenticated: false,
//   currentUser: {},
//   isLoading: false,
//   reload: null,
//   openEditProfile: false,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     reloadUser: (state) => {
//       state.reload = Math.random();
//     },
//     logout: (state) => {
//       localStorage.removeItem(TOKEN_TYPES.ACCESS_TOKEN);
//       state.isAuthenticated = false;
//       state.currentUser = {};
//       window.location.href = PATH.LOGIN;
//     },
//     setOpenEditProfile: (state) => {
//       state.openEditProfile = !state.openEditProfile;
//     },
//   },
//   extraReducers: (builder) =>
//     builder
//       .addCase(fetchCurrentUser.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchCurrentUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.currentUser = action.payload;
//         state.isAuthenticated = true;
//       })
//       .addCase(fetchCurrentUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message;
//       })
//       .addCase(updateUserById.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(updateUserById.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message;
//       }),
// });

// export const { reloadUser, logout, setOpenEditProfile } = userSlice.actions;

// export default userSlice.reducer;
