import React, { useState, createContext } from "react";
import { signIn, signUp } from "../services/userService";
import { handleJwt } from "../helpers/handleJwt";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await signIn(credentials);
      const { token } = response;
      if (token !== undefined) {
        const decoded = handleJwt(token);
        setUser(decoded);
        setIsAuth(true);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  // Register User
  const register = async (registerData) => {
    setIsLoading(true);
    try {
      const res = await signUp(registerData);
      if (res) {
        await login({
          email: registerData.email,
          password: registerData.password,
        });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    handleJwt(null);
    setUser();
    setIsAuth(false);
  };

  // Check Local Storage for Token
  const checkLocalToken = (token) => {
    if (token) {
      const decoded = handleJwt(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp > currentTime) {
        setUser(decoded);
        setIsAuth(true);
      } else {
        setUser();
        setIsAuth(false);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        user,
        isLoading,
        login,
        register,
        logout,
        checkLocalToken,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
