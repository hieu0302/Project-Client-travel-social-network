import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Alert, Flex, Spin } from "antd";
import { TOKEN_TYPES } from "../utils/constants";
import { useEffect, useState } from "react";
import Logo from "../../src/assets/Trip-removebg-preview.png";

const PrivateRoute = ({ component: Component }) => {
  const { isAuthenticated, fetchCurrentUserPending } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!fetchCurrentUserPending) {
      setIsInitialized(true);
    }
  }, [fetchCurrentUserPending]);

  const [isInitialized, setIsInitialized] = useState(false);

  if (!isInitialized) {
    return (
      <div className=" mt-36 mx-auto">
        <img src={Logo} alt="Logo" className=" w-48" />
        <Spin className="mt-5" size="large">
          <div className="mt-5 content w-36 font-bold" />
        </Spin>
      </div>
    );
  }

  // if (!isAuthenticated) {
  //   return <Navigate to={"/login"} />;
  // }

  const accessToken = localStorage.getItem(TOKEN_TYPES.ACCESS_TOKEN);
  if (!accessToken) {
    return <Navigate to={"/login"} />;
  }

  return <Component />;
};

export default PrivateRoute;
