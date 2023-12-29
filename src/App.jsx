import { useEffect, useState } from "react";
import PrivateRoute from "./routes/privateRoute";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import routes from "./routes";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./layouts/NavBar/navbar";
import { TOKEN_TYPES } from "./utils/constants";
import { fetchCurrentUser } from "./redux/user/userActions";
import Logo from "./assets/Trip-removebg-preview.png";
import { Alert, Flex, Spin } from "antd";

const App = () => {
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState(null);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = localStorage.getItem(TOKEN_TYPES.ACCESS_TOKEN);
    // const userLocal = localStorage.getItem("userInfo");

    if (accessToken) {
      dispatch(fetchCurrentUser()).then((result) => {
        setCurrentUser(result);
      });
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCurrentUser());
    }
  }, []);
  // const currentPath = location.pathname;
  // const excludePath = ["/login", "/signup"];
  return (
    <div className="flex">
      {isAuthenticated && (
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
