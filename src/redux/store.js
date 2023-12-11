import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./posts/postSlice";
import authReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
});
