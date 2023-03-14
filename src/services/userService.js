import { api } from "../config/ApiConfig";

export const signIn = async ({ email, password }) => {
  try {
    const { data } = await api.post("/signin", { email, password });
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const userRegister = async ({ name, email, password }) => {
  try {
    const { data } = await api.post("/signup", { name, email, password });
    return data;
  } catch (error) {
    throw error.response.data;
  }
};
