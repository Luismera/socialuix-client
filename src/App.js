import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "./config/ApiConfig";
import { useAuth } from "./hooks/useAuth";
import ChangePassword from "./pages/ChangePassword";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  const { isAuth, checkLocalToken } = useAuth();

  useEffect(() => {
    if (!isAuth) {
      const token = localStorage.getItem("jwToken");
      checkLocalToken(token);
    }
  }, [isAuth]);

  api.interceptors.response.use((response) => {
    if (isAuth && response.status >= 300) {
      console.log(response.statusText);
    }
    return response;
  });

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoutes isAuth={isAuth} />}>
            <Route path="/signin" element={<SignIn />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route element={<PrivateRoutes isAuth={isAuth} />}>
            <Route element={<Dashboard />} path="/" exact />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
