const express = require("express");
const roleValidation = require("../middlewares/roleValidation");
const router = express.Router();
const routineService = require("../services/routineService");

// GET ALL ROUTINES --> solo el admin (private, public), los users no pueden ver todas las rutinas
router.get("/all", roleValidation("user"), async (req, res, next) => {
  try {
    const routines = await routineService.getAllRoutines(req.user);
    res.status(200).json(routines);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET ONE ROUTINE --> el get no tiene req.body
router.get("/:id", roleValidation("user"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await routineService.getRoutineById(req.user, id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// CREATE ROUTINE
router.post("/", roleValidation("user"), async (req, res, next) => {
  try {
    await routineService.createRoutine(req.body);
    res.sendStatus(201);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// EDIT ROUTINE
router.put("/", roleValidation("user"), async (req, res, next) => {
  try {
    await routineService.editRoutine(req.user, req.body);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE ROUTINE
router.delete("/", roleValidation("user"), async (req, res, next) => {
  try {
    const { id } = req.body;
    await routineService.removeRoutine(req.user, id);
    res.sendStatus(201);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
