export const setToken = (value) => localStorage.setItem("token", value);
export const getToken = () => localStorage.getItem("token");
export const deleteToken = () => {
  localStorage.removeItem("token");
  localStorage.clear();
};
export const setExpireToken = (value) => {
  localStorage.setItem("expiresIn", value);
};

export const validationExpireToken = () => {
  const token = localStorage.getItem("token") || null;
  /*=============================================
  Validamos que el token sea real
  =============================================*/
  if (token) {
    /*=============================================
    Validamos fecha de expiración
    =============================================*/
    if (localStorage.getItem("expiresIn")) {
      let expiresIn = Number(localStorage.getItem("expiresIn"));

      if (expiresIn > Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};
