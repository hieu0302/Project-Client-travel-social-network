import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./posts/postSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
