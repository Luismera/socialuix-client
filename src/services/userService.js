import { api } from "../config/ApiConfig";

export const signIn = async ({ email, password }) => {
  try {
    const { data } = await api.post("/signin", { email, password });
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const signUp = async ({ name, email, password }) => {
  try {
    const { data } = await api.post("/signup", { name, email, password });
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const forgot = async ({ email }) => {
  try {
    const { data } = await api.post("/forgot", { email });
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const changePassword = async ({ password, token }) => {
  try {
    const { data } = await api.post(
      "/reset-password",
      { password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw error.response.data;
  }
};
