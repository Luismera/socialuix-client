export const initialsName = (name) => {
  if (typeof name !== "string") {
    throw TypeError("El argumento debe ser una cadena de caracteres");
  }

  let splitName = name.split(" ");

  if (splitName.length >= 2) {
    return `${splitName[0].charAt(0)}${splitName[1].charAt(0)}`.toUpperCase();
  } else {
    return `${splitName[0].charAt(0)}${splitName[0].charAt(1)}`.toUpperCase();
  }
};
