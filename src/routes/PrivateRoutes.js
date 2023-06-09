import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = ({ isAuth }) => {
  return isAuth ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
