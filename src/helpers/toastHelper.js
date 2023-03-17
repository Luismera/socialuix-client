import { toast } from "react-toastify";

const launchToast = (message, type) => {
  toast[type](message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export default launchToast;
