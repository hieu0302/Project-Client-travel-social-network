import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { TOKEN_TYPES } from "../utils/constants";

const PrivateRoute = ({ component: Component }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  console.log(isAuthenticated);
  if (!isLoading && !isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  const accessToken = localStorage.getItem(TOKEN_TYPES.ACCESS_TOKEN);
  if (!accessToken) {
    return <Navigate to={"/login"} />;
  }

  return <Component />;
};

export default PrivateRoute;
