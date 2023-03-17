import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import launchToast from "../helpers/toastHelper";
import { useQuery } from "../hooks/useQuery";
import { changePassword } from "../services/userService";

function ChangePassword() {
  let navigate = useNavigate();
  let query = useQuery();
  const token = query.get("token");
  console.log("token :>> ", token);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await changePassword({ ...data, token });
      navigate("/signin");
      setIsLoading(false);
      launchToast("Contraseña actualizada exitosamente", "success");
    } catch (error) {
      console.error("error :>> ", error);
      launchToast(error.message, "error");
      setIsLoading(false);
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-password-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">
                        Nueva contraseña
                      </h1>
                    </div>
                    <form className="user" onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Nueva contraseña"
                          className={`form-control-user form-control ${
                            errors.password ? "is-invalid" : ""
                          }`}
                          {...register("password", {
                            required: "Este campo es requerido",
                          })}
                        />
                        {errors.password && (
                          <span className="invalid-feedback">
                            {errors.password.message}
                          </span>
                        )}
                      </div>
                      <button className="btn btn-primary btn-user btn-block">
                        {isLoading ? (
                          <div className="spinner-border spinner-border-sm" />
                        ) : (
                          "Cambiar contraseña"
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
