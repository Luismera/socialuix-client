import React from "react";
import Feed from "../components/Feed";
import { useAuth } from "../hooks/useAuth";

function Dashboard() {
  const { logout } = useAuth();
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-6 col-lg-6 col-md-6 my-5">
          <button type="button" onClick={logout} className="btn btn-danger">
            Cerrar sesion
          </button>
          <Feed />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
