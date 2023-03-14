import React from "react";
import { initialsName } from "../helpers/utils";

function UserAvatar({ name }) {
  const parseName = initialsName(name || "Sin Nombre");
  return (
    <div>
      <div className="avatar-continer">
        <p className="initials">{parseName}</p>
      </div>
    </div>
  );
}

export default UserAvatar;
