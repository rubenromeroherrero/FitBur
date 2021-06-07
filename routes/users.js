const express = require("express");
const roleValidation = require("../middlewares/roleValidation");
const router = express.Router();
const userService = require("../services/userService");

// SIGNUP
router.post("/signup", async (req, res, next) => {
  try {
    await userService.signup(req.body);
    res.sendStatus(201);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// LOGIN
router.post("/login", async (req, res, next) => {
  try {
    // necesitamos retornar un user(formato token) --> nos permitirá realizar los put, get, delete
    const user = await userService.login(req.body);
    // mostrar token
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET ALL USERS --> solo el admin puede solicitar ver todos los usuarios de la app
router.get("/all", roleValidation(""), async (req, res, next) => {
  try {
    const user = await userService.getAllUsers();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// LOS GET NO TIENEN BODY!!
// GET ONE USER --> sin password, porque lo tenemos definido en la entity User
router.get("/:id", roleValidation(""), async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getUser(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// EDIT
router.put("/", roleValidation("user"), async (req, res, next) => {
  try {
    // necesitamos poner la authorization para poder modificar los datos
    // cogemos de ese token (req.user) loggeado el id
    const { id } = req.user;
    await userService.editUser(id, req.body);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE
router.delete("/", roleValidation("user"), async (req, res, next) => {
  try {
    await userService.removeUser(req.user);
    res.sendStatus(201);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
