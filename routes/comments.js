const express = require("express");
const router = express.Router();
const roleValidation = require("../middlewares/roleValidation");
const commentService = require("../services/commentService");

// GET COMMENTS
router.get("/all", roleValidation("user"), async (req, res, next) => {
  try {
    const comments = await commentService.getAllComments();
    res.status(200).json(comments);
  } catch (error) {
    res.sendStatus(400).json({ message: error.message });
  }
});

// GET COMMENT
router.get("/:id", roleValidation("user"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await commentService.getComment(req.user, id);
    res.status(200).json(comment);
  } catch (error) {
    res.sendStatus(400).json({ message: error.message });
  }
});

// CREATE COMMENT
router.post("/", roleValidation("user"), async (req, res, next) => {
  try {
    await commentService.createComment(req.body);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(400).json({ message: error.message });
  }
});

// EDIT COMMENT
router.put("/:id", roleValidation("user"), async (req, res, next) => {
  try {
    const { id } = req.params;
    await commentService.editComment(req.user, req.body, id);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(400).json({ message: error.message });
  }
});

// DELETE COMMENT
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await commentService.removeComment(req.user, id);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(400).json({ message: error.message });
  }
});

module.exports = router;
