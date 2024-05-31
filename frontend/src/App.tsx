import { useState } from "react";
import { getTasks, createTask } from "./utils/api";
import Task from "./models/Task";
import TaskItem from "./components/TaskItem";
import CreateTaskForm from "./components/CreateTaskForm";
import axios from "axios";

const dummyTask: Task = {
  _id: "1",
  name: "Task 1",
  releaseDate: "2023-05-01",
  dueDate: "2023-06-01",
};

const dummyTasks: Task[] = [
  {
    _id: "1",
    name: "Task 1",
    releaseDate: "2023-05-01",
    dueDate: "2023-06-01",
  },
  {
    _id: "2",
    name: "Task 2",
    releaseDate: "2023-05-15",
    dueDate: "2023-06-15",
  },
  {
    _id: "3",
    name: "Task 3",
    releaseDate: "2023-06-01",
    dueDate: "2023-07-01",
  },
];

function App() {
  const tasks = dummyTasks;
  return (
    <>
      {tasks.map((task) => (
        <div key={task._id}>
          <h3>{task.name}</h3>
          <p>Release Date: {task.releaseDate}</p>
          <p>Due Date: {task.dueDate}</p>
        </div>
      ))}
    </>
  );
}

export default App;
