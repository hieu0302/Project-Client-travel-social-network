import NewsFeed from "../pages/NewsFeed/newsfeed";
import Notify from "../pages/Notify/notify";
import User from "../pages/User/user";

const publicRoutes = [
  { path: "/posts", component: NewsFeed },
  { path: "/user", component: User },
  { path: "/notify", component: Notify },
];

// const privateRoutes = [];

// const privateRoutesMapping = privateRoutes.map((route) => ({
//   ...route,
//   isPrivated: true,
// }));

const routes = [...publicRoutes];

export default routes;
