import React, { useState, useEffect, createContext, useMemo } from "react";
import {
  getToken,
  setToken,
  deleteToken,
  setExpireToken,
  validationExpireToken,
} from "../helpers/auth";
import { useNavigate } from "react-router-dom";
import { signIn } from "../services/userService";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await signIn(credentials);
      const { email, name, token } = response;
      const decodedToken = jwt_decode(token);
      setUser({ email, name });
      setToken(token);
      setExpireToken(decodedToken.exp);
      setIsLoading(false);
    } catch (error) {
      logout();
      setIsLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    setUser(null);
    deleteToken();
    navigate("/signin");
  };

  const retrieveUserProfile = async () => {
    const accessToken = getToken();
    const tokenIsValid = validationExpireToken();

    if (accessToken === null || (accessToken === undefined && !tokenIsValid)) {
      logout();
      return;
    }

    const decodedToken = jwt_decode(accessToken);
    const { email, name } = decodedToken;
    setUser({ email, name });
  };

  useEffect(() => {
    retrieveUserProfile();
  }, []);

  const value = useMemo(() => {
    return {
      user,
      isLoading,
      login,
      logout,
      setUser,
    };
  }, [user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
