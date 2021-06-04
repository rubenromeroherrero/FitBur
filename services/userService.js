// modelo de negocio
const userRepository = require("../repositories/userRepository");
const encryptPassword = require("../util/encryptPassword");
const {
  insertUserSchema,
  updateUserSchema,
} = require("../validations/userValidations");
const { signToken } = require("../services/jwtService");

// SIGNUP
exports.signup = async (user) => {
  // validamos la información introducida por el user
  const validationData = await insertUserSchema.validateAsync(user);

  // encriptamos contraseña del usuario, de la validación
  const encryptedPassword = await encryptPassword(validationData.password);

  // enviamos al repositorio, el usuario validado, con la password encriptada
  await userRepository.insertUser({
    ...validationData,
    password: encryptedPassword,
  });
};

//LOGIN
exports.login = async ({ email, password }) => {
  if (!email || !password) throw new Error("Invalid data provided");

  // buscar si existe ese usuario en la DB
  const user = await userRepository.findUserWithPasswordByEmail(email);

  if (!user) throw new Error("Not found user");

  const encryptedPassword = await encryptPassword(password);

  // comprobamos si ese usuario de la DB coincide con la pass que introduce
  if (user.password !== encryptedPassword) throw new Error("Wrong password");

  // generar un token que es lo que nos va a devolver, HACE QUE LA INFO DEL USER NO SE PUEDA INTERPRETAR
  const token = signToken({ id: user.id, email: user.email, role: user.role });

  // almacenamos el token en la vista para que cada vez que hagamos petición lo incluyamos en la cabecera
  return token;
};

// GET ALL USERS
exports.getAllUsers = async () => {
  return await userRepository.findAllUsers();
};

// GET ONE USER
exports.getUser = async (user) => {};

// EDIT PROFILE USER
exports.editUser = async (id, userDetails) => {
  // validamos lo que introduce en el req.body
  const validation = await updateUserSchema.validateAsync(userDetails);

  // en caso de querer cambiar la contraseña --> encriptamos
  if (validation.password) {
    validation.password = await encryptPassword(validation.password);
  }
  await userRepository.updateUser(id, validation);
};

// DELETE USER
exports.removeUser = async ({ id }) => {
  if (!id) throw new Error();

  await userRepository.deleteUser(id);
};
