import { Outlet, Navigate } from "react-router-dom";
import { getToken } from "../helpers/auth";

const PrivateRoutes = () => {
  let token = getToken();
  let auth = { token: token !== undefined ? true : false };
  return auth.token ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
