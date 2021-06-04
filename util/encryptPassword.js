// requerimos librería crypto para encriptar la contraseña
const crypto = require("crypto");
const { promisify } = require("util");

// converitmos a formato promesa
const encripter = promisify(crypto.scrypt);

const encryptPassword = async (password) => {
  // invocamos la funcion que nos permite encriptar //codigo de seguridad SALT
  const encryptedPassword = await encripter(password, process.env.SALT, 32);

  // transformar a formato string hexadecimal --> para manipularlo y poder entenderlo
  return encryptedPassword.toString("hex");
};

module.exports = encryptPassword;
