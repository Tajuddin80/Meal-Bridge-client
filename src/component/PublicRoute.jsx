import { use } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Firebase/AuthContext/AuthContext";


const PublicRoute = ({ children }) => {
  const { user } = use(AuthContext);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
