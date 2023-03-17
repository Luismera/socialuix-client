import axios from "axios";

export const api = axios.create({
  baseURL: "https://api-dot-socialuix.appspot.com",
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};
