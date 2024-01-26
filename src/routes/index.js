import NewsFeed from "../pages/NewsFeed/newsfeed";
import Notify from "../pages/Notify/notify";
import profilePage from "../pages/Profile/profilePage";
import User from "../pages/User/user";
import Authen from "../pages/authentication/authen";
import Bookmark from "../pages/Bookmark/Boomark";
import Album from "../pages/Album/album";
import ChatBox from "../pages/Chat/Chat";
import Search from "../pages/Search/Search";

const publicRoutes = [
  { path: "/login", component: Authen },
  { path: "/signup", component: Authen },
];

const privateRoutes = [
  { path: "/", component: NewsFeed },
  { path: "/inbox", component: ChatBox },
  { path: "/user", component: User },
  { path: "/notify", component: Notify },
  { path: "/profile", component: profilePage },
  { path: "/bookmark", component: Bookmark },
  { path: "/album", component: Album },
];

const privateRoutesMapping = privateRoutes.map((route) => ({
  ...route,
  isPrivated: true,
}));

const routes = [...publicRoutes, ...privateRoutesMapping];

export default routes;
