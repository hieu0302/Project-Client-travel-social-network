import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NewsFeed from "./pages/NewsFeed/newsfeed";
import { Route, Routes, useLocation } from "react-router-dom";
import routes from "./routes";
import PrivateRoute from "./routes/privateRoute";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./layouts/NavBar/navbar";
const App = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const excludePath = ["/login", "/signup"];

  return (
    <div className="flex">
      {!excludePath.includes(currentPath) && (
        <div>
          <NavBar />
        </div>
      )}
      <Routes>
        {routes.map((route) => {
          const Page = route.component;
          let routeElement = <Page />;
          return (
            <Route key={route.path} path={route.path} element={routeElement} />
          );
        })}
      </Routes>
    </div>
  );
};

export default App

 // if (route.isPrivated) {
          //   routeElement = <PrivateRoute component={Page} />;
          // }
