import { useEffect } from "react";
import PrivateRoute from "./routes/privateRoute";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import routes from "./routes";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./layouts/NavBar/navbar";
import { TOKEN_TYPES } from "./utils/constants";
import { fetchCurrentUser } from "./redux/user/userActions";

const App = () => {
  const location = useLocation();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = localStorage.getItem(TOKEN_TYPES.ACCESS_TOKEN);
    if (accessToken) {
      dispatch(fetchCurrentUser());
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCurrentUser());
    }
  }, []);
  const currentPath = location.pathname;
  const excludePath = ["/login", "/signup"];
  return (
    <div className="flex">
      {isAuthenticated && !excludePath.includes(currentPath) && (
        <div>
          <NavBar />
        </div>
      )}
      <Routes>
        {routes.map((route) => {
          const Page = route.component;
          let routeElement = <Page />;
          if (route.isPrivated) {
            routeElement = <PrivateRoute component={Page} />;
          }
          return (
            <Route key={route.path} path={route.path} element={routeElement} />
          );
        })}
      </Routes>
    </div>
  );
};

export default App;

// if (route.isPrivated) {
//   routeElement = <PrivateRoute component={Page} />;
// }
