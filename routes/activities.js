const express = require("express");
const router = express.Router();
const activityService = require("../services/activityService");
const roleValidation = require("../middlewares/roleValidation");

// GET ALL ACTIVITIES
router.get("/all", roleValidation("user"), async (req, res, next) => {
  try {
    const activities = await activityService.getAllActivities();
    res.status(200).json(activities);
  } catch (error) {
    res.sendStatus(400).json({ message: error.message });
  }
});

// GET ONE ACTIVITY
router.get("/:id", roleValidation("user"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const activity = await activityService.getActivity(req.user, id);
    res.status(200).json(activity);
  } catch (error) {
    res.sendStatus(400).json({ message: error.message });
  }
});

// CREATE ACTIVITY
router.post("/", roleValidation("user"), async (req, res, next) => {
  try {
    await activityService.createActivity(req.body);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(400).json({ message: error.message });
  }
});

// EDIT ACTIVITY
router.put("/:id", roleValidation("user"), async (req, res, next) => {
  try {
    const { id } = req.params;
    await activityService.editActivity(req.user, req.body, id);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(400).json({ message: error.message });
  }
});

// DELETE ACTIVITY
router.delete("/", roleValidation("user"), async (req, res, next) => {
  try {
    const { id } = req.body;
    await activityService.removeActivity(req.user, id);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(400).json({ message: error.message });
  }
});

module.exports = router;
