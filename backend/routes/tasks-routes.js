const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const tasksControllers = require("../controllers/tasks-controller");

router.get("/", tasksControllers.getAllTasks);

router.get("/:tid", tasksControllers.getTaskById);

router.get("/users/:uid", tasksControllers.getTaskByUserId);

router.post(
  "/",
  [
    check("name").not().isEmpty(),
    check("releaseDate").not().isEmpty(),
    check("creator").not().isEmpty(),
  ],
  tasksControllers.createTask
);

router.patch("/:tid", tasksControllers.editTaskById);

router.delete("/:tid", tasksControllers.deleteTaskById);

module.exports = router;
