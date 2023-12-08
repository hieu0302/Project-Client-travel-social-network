import NewsFeed from "../pages/NewsFeed/newsfeed";
import Notify from "../pages/Notify/notify";
import profilePage from "../pages/Profile/profilePage";
import User from "../pages/User/user";
import LoginPage from "../pages/authentication/LoginPage/LoginPage";
import SignupPage from "../pages/authentication/SignupPage/SignupPage";

const publicRoutes = [
  { path: "/posts", component: NewsFeed },
  { path: "/user", component: User },
  { path: "/notify", component: Notify },
  { path: "/login", component: LoginPage },
  { path: "/signup", component: SignupPage },
  { path: "/profile", component: profilePage },
];

// const privateRoutes = [];

// const privateRoutesMapping = privateRoutes.map((route) => ({
//   ...route,
//   isPrivated: true,
// }));

const routes = [...publicRoutes];

export default routes;
