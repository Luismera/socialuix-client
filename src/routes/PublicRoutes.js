import { Outlet, Navigate } from "react-router-dom";

const PublicRoutes = ({ isAuth }) => {
  return !isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoutes;
