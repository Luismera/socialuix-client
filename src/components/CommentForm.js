import React from "react";
import UserAvatar from "./UserAvatar";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";

function CommentForm({ saveComment, isLoading, cancelCallback }) {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await saveComment(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-3">
      <div className="d-flex align-items-start m-0 ">
        <UserAvatar name={user.name} size={38} />
        <div className="flex-fill">
          <div className="mb-2">
            <input
              placeholder="Añadir un comentario…"
              className={`form-control-round form-control ${
                errors.content ? "is-invalid" : ""
              }`}
              {...register("content", {
                required: "Este campo es requerido",
              })}
            />
            {errors.content && (
              <span className="invalid-feedback">{errors.content.message}</span>
            )}
          </div>
          <div>
            <button className="btn btn-primary btn-round btn-sm">
              {isLoading ? (
                <i className="spinner-border spinner-border-sm"></i>
              ) : (
                "Publicar"
              )}
            </button>
            {cancelCallback && (
              <button
                type="button"
                className="btn btn-link"
                onClick={cancelCallback}
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default CommentForm;
