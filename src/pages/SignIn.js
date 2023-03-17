import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import launchToast from "../helpers/toastHelper";

function SignIn() {
  let navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate("/");
    } catch (error) {
      console.error("error :>> ", error);
      launchToast(error.message, "error");
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">
                        Bienvenido Socialuix!
                      </h1>
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
                                '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/',
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
                      <div className="form-group">
                        <input
                          type="password"
                          placeholder="Contraseña"
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
                          "Login"
                        )}
                      </button>
                    </form>
                    <hr />
                    <div className="text-center">
                      <Link className="small" to="/forgot-password">
                        ¿Has olvidado tu contraseña?
                      </Link>
                    </div>
                    <div className="text-center">
                      <Link className="small" to="/signup">
                        ¡Crea una cuenta!
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

export default SignIn;
