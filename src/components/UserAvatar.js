import React from "react";
import { initialsName } from "../helpers/utils";

function UserAvatar({ name, size }) {
  const parseName = initialsName(name || "Sin Nombre");
  return (
    <div>
      <div
        className="avatar-continer"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <p className="initials">{parseName}</p>
      </div>
    </div>
  );
}

export default UserAvatar;
