import { Navigate, useLocation, Link } from "react-router-dom";
import Signup from "./SignupPage/SignupPage";
import Login from "./LoginPage/LoginPage";
import { useSelector } from "react-redux";
import React, { useState } from "react";

const backgroundImageUrl =
  "https://www.anhngumshoa.com/uploads/images/userfiles/hoatdongngoaikhoa/travel-agency-merchant-account.jpg";

const Authen = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  const AuthenForm = () => {
    const { pathname } = location;
    if (pathname === "/signup") {
      return <Signup />;
    } else if (pathname === "/login") {
      return <Login />;
    }
    return null;
  };

  return (
    <div
      className="w-screen h-screen"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
      }}
    >
      <AuthenForm />
    </div>
  );
};
export default Authen;
