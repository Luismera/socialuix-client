import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import launchToast from "../helpers/toastHelper";
import { forgot } from "../services/userService";

function ForgotPassword() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await forgot(data);
      navigate("/");
      setIsLoading(false);
      launchToast(
        "Hemos enviado las instrucciones a tu correo electronico",
        "success"
      );
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
                      <h1 className="h4 text-gray-900 mb-2">
                        ¿Olvidaste tu contraseña?
                      </h1>
                      <p className="mb-4">
                        Lo entendemos, pasan cosas. Solo ingrese su dirección de
                        correo electrónico a continuación y le enviaremos un
                        enlace para restablecer su contraseña.
                      </p>
                    </div>
                    <form className="user" onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-group">
                        <input
                          type="email"
                          placeholder="Correo electrónico"
                          className={`form-control-user form-control ${
                            errors.email ? "is-invalid" : ""
                          }`}
                          {...register("email", {
                            required: "Este campo es requerido",
                            pattern: {
                              value:
                                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message:
                                "¡Debe proporcionar una dirección de correo electrónico válida!",
                            },
                          })}
                        />
                        {errors.email && (
                          <span className="invalid-feedback">
                            {errors.email.message}
                          </span>
                        )}
                      </div>
                      <button className="btn btn-primary btn-user btn-block">
                        {isLoading ? (
                          <div className="spinner-border spinner-border-sm" />
                        ) : (
                          "Restablecer la contraseña"
                        )}
                      </button>
                    </form>
                    <hr />
                    <div className="text-center">
                      <Link className="small" to="/signup">
                        ¡Crea una cuenta!
                      </Link>
                    </div>
                    <div className="text-center">
                      <Link className="small" to="/signin">
                        ¿Ya tienes una cuenta? ¡Acceso!
                      </Link>
                    </div>
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

export default ForgotPassword;
