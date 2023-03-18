import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import launchToast from "../helpers/toastHelper";
import { postFeed, putFeed } from "../services/feedService";

function FeedForm({ isOpen, handlerClose, defaultData }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (defaultData !== undefined) {
      reset({
        content: defaultData.content,
      });
    }
  }, [defaultData]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (defaultData !== undefined) {
        await putFeed(defaultData._id, data);
        launchToast("Publicaion Actualizada exitosamente", "success");
      } else {
        await postFeed(data);
        launchToast("Publicaion creada exitosamente", "success");
      }
      setIsLoading(false);
      reset();
      handlerClose();
    } catch (error) {
      console.error("error :>> ", error);
      launchToast(error.message, "error");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: isOpen ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form className="user" onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-header">
                <h5 className="modal-title">
                  {defaultData !== undefined
                    ? "Actualizar publicacion"
                    : "Crear publicacion"}
                </h5>
                <button type="button" className="link" onClick={handlerClose}>
                  <i className="fa-regular fa-close"></i>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <textarea
                    placeholder="¿Sobre qué quieres hablar?"
                    rows={5}
                    className={`form-control ${
                      errors.content ? "is-invalid" : ""
                    }`}
                    {...register("content", {
                      required: "Este campo es requerido",
                    })}
                  ></textarea>
                  {errors.content && (
                    <span className="invalid-feedback">
                      {errors.content.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={handlerClose}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary btn-round">
                  {isLoading ? (
                    <div className="spinner-border spinner-border-sm mx-3" />
                  ) : (
                    "Publicar"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className="modal-backdrop fade show"
        style={{ display: isOpen ? "block" : "none" }}
      ></div>
    </>
  );
}

export default FeedForm;
