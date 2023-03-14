import axios from "axios";

export const api = axios.create({
  baseURL: "https://api-dot-socialuix.appspot.com",
});
