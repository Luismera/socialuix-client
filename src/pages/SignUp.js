import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../services/userService";

function SignUp() {
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
      await userRegister(data);
      navigate("/signin");
      setIsLoading(false);
    } catch (error) {
      console.error("error :>> ", error);
      setIsLoading(false);
    }
  };
  return (
    <div className="container">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          <div className="row">
            <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
            <div className="col-lg-7">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">¡Crea una cuenta!</h1>
                </div>
                <form className="user" onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      id="exampleFirstName"
                      placeholder="Nombre completo"
                      {...register("name")}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-user"
                      id="exampleInputEmail"
                      placeholder="Correo electronico"
                      {...register("email")}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-user"
                      id="exampleInputPassword"
                      placeholder="Contraseña"
                      {...register("password")}
                    />
                  </div>
                  <button className="btn btn-primary btn-user btn-block">
                    {isLoading ? (
                      <div className="spinner-border spinner-border-sm" />
                    ) : (
                      "Registrar Cuenta"
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
  );
}

export default SignUp;
