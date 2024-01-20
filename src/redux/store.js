import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./posts/postSlice";
import authReducer from "./user/userSlice";
import commentReducer from "./comments/commentSlice";
import likeReducer from "./likes/LikeSlice";
import albumReducer from "./album/albumSlice";
import notifyReducer from "./Notification/NotificationSilce";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    comment: commentReducer,
    like: likeReducer,
    album: albumReducer,
    notify: notifyReducer,
  },
});
