import React from "react";
import UserAvatar from "./UserAvatar";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";

function CommentForm({ saveComment, isLoading, cancelCallback }) {
  const { user } = useAuth();
  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = async (data) => {
    await saveComment(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-3">
      <div className="d-flex align-items-center m-0 ">
        <UserAvatar name={user.name} />
        <div className="flex-fill">
          <input
            className="form-control form-control-round"
            placeholder="Añadir un comentario…"
            {...register("content")}
          />
        </div>
        <button className="btn btn-primary btn-round btn-sm">
          {isLoading ? (
            <div className="spinner-border spinner-border-sm" />
          ) : (
            <i className="fa-regular fa-paper-plane"></i>
          )}
        </button>
      </div>
      {cancelCallback && (
        <button type="button" className="link" onClick={cancelCallback}>
          Cancelar
        </button>
      )}
    </form>
  );
}

export default CommentForm;
