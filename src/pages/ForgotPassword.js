import React from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
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
                    <form className="user">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-user"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Introducir correo electrónico..."
                        />
                      </div>
                      <button className="btn btn-primary btn-user btn-block">
                        Restablecer la contraseña
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
