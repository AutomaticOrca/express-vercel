import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();
const tasksFilePath = path.resolve(__dirname, "../../tasks.json");

// Helper function to read tasks from file
const readTasksFromFile = (): any[] => {
  const data = fs.readFileSync(tasksFilePath, "utf-8");
  return JSON.parse(data);
};

// Helper function to write tasks to file
const writeTasksToFile = (tasks: any[]): void => {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
};

router.post("/tasks", (req, res) => {
  try {
    const { name, releaseDate, dueDate } = req.body;
    const tasks = readTasksFromFile();
    const newTask = { id: Date.now().toString(), name, releaseDate, dueDate };
    tasks.push(newTask);
    writeTasksToFile(tasks);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to add task" });
  }
});

export default router;
