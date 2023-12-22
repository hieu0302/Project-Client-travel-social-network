import NewsFeed from "../pages/NewsFeed/newsfeed";
import Notify from "../pages/Notify/notify";
import profilePage from "../pages/Profile/profilePage";
import User from "../pages/User/user";
import LoginPage from "../pages/authentication/LoginPage/LoginPage";
import SignupPage from "../pages/authentication/SignupPage/SignupPage";
import Authen from "../pages/authentication/authen";
import BookMark from "../pages/SavedPost/SavedPost";
const publicRoutes = [
  { path: "/login", component: Authen },
  { path: "/signup", component: Authen },
];

const privateRoutes = [
  { path: "/posts", component: NewsFeed },
  { path: "/user", component: User },
  { path: "/notify", component: Notify },
  { path: "/profile", component: profilePage },
  { path: "/bookmark", component: BookMark },
];

const privateRoutesMapping = privateRoutes.map((route) => ({
  ...route,
  isPrivated: true,
}));

const routes = [...publicRoutes, ...privateRoutesMapping];

export default routes;
