const express = require("express");
const roleValidation = require("../middlewares/roleValidation");
const router = express.Router();
const routineService = require("../services/routineService");

// GET ALL ROUTINES
router.get("/all", roleValidation("user"), async (req, res, next) => {
  try {
    const routines = await routineService.getAllRoutines();
    res.status(200).json(routines);
  } catch (error) {
    res.sendStatus(400).json({ message: error.message });
  }
});

// GET ONE ROUTINE
router.get("/", roleValidation("user"), async (req, res, next) => {
  try {
    const { id } = req.body;
    const user = await routineService.getRoutineById(id);
    res.status(200).json(user);
  } catch (error) {
    res.sendStatus(400).json({ message: error.message });
  }
});

// CREATE ROUTINE
router.post("/", roleValidation("user"), async (req, res, next) => {
  try {
    await routineService.createRoutine(req.body);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(400).json({ message: error.message });
  }
});

// EDIT ROUTINE
router.put("/", roleValidation("user"), async (req, res, next) => {
  try {
    const { id } = req.body;
    await routineService.editRoutine(req.user, req.body, id);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(400).json({ message: error.message });
  }
});

// DELETE ROUTINE
router.delete("/", roleValidation("user"), async (req, res, next) => {
  try {
    const { id } = req.body;
    await routineService.removeRoutine(req.user, id);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(400).json({ message: error.message });
  }
});

module.exports = router;
