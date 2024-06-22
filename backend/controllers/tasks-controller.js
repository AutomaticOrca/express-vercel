const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../tasks.json");
// Helper function to read tasks from file
const readTasksFromFile = () => {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

// Helper function to write tasks to file
const writeTasksToFile = (tasks) => {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
};

const getAllTasks = (req, res, next) => {
  const tasks = readTasksFromFile();
  console.log("get all tasks:", tasks);
  res.json({ message: "get tasks works" });
};

const getTaskById = (req, res, next) => {
  const taskId = req.params.tid;
  const tasks = readTasksFromFile();
  const task = tasks.find((t) => {
    return t._id === taskId;
  });

  if (!task) {
    throw new HttpError(
      "Could not find a place for the provided task id.",
      404
    );
  }

  res.json({ message: `GET request in Task ${task.name}` });
};

const getTaskByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const tasks = readTasksFromFile();

  const task = tasks.find((t) => {
    return t.creator === userId;
  });

  if (!task) {
    throw new HttpError(
      "Could not find a place for the provided user id.",
      404
    );
  }

  res.json({ task });
};

const createTask = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid create task input, check your data pls", 422);
  }

  const { name, releaseDate, dueDate, creator } = req.body;
  const _id = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
  const createdTask = {
    _id,
    name,
    releaseDate,
    dueDate,
    creator,
  };
  const tasks = readTasksFromFile();
  tasks.push(createdTask);
  writeTasksToFile(tasks);
  res.status(201).json({ task: createdTask });
};

const editTaskById = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError(
      "Invalid edited task input, please check your data.",
      422
    );
  }

  const taskId = req.params.tid;

  const { name, releaseDate, dueDate, creator } = req.body;
  const editedTask = {
    _id: taskId,
    name,
    releaseDate,
    dueDate,
    creator,
  };

  const tasks = readTasksFromFile();
  const taskIndex = tasks.findIndex((t) => {
    return t._id === taskId;
  });

  if (taskIndex === -1) {
    return res.status(500);
  }

  tasks[taskIndex] = { ...tasks[taskIndex], ...editedTask };
  writeTasksToFile(tasks);
  res.status(201).json({ tasks });
};

const deleteTaskById = (req, res, next) => {
  const taskId = req.params.tid;
  const tasks = readTasksFromFile();
  const updatedTasks = tasks.filter((t) => t._id !== taskId);

  if (tasks.length === updatedTasks.length) {
    throw new HttpError("Could not find a place for the provided task id", 404);
  }
  writeTasksToFile(updatedTasks);
  res.status(200).json({ message: "delete task success" });
};

exports.getAllTasks = getAllTasks;
exports.getTaskById = getTaskById;
exports.getTaskByUserId = getTaskByUserId;
exports.createTask = createTask;
exports.editTaskById = editTaskById;
exports.deleteTaskById = deleteTaskById;
