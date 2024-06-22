import { useState, useEffect } from "react";
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
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/api/tasks/all");
        console.log(response);
        setTasks(response.data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleCreateTask = async (taskName: string) => {
    try {
      const releaseDate = new Date().toISOString().split("T")[0]; // current date
      const newTask = { name: taskName, releaseDate, dueDate: releaseDate }; // you can set the due date as needed
      const response = await axios.post("/api/tasks/add", newTask);
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  return (
    <>
      {JSON.stringify(tasks)}
      {/* {tasks.map((task) => (
        <div key={task._id}>
          <h3>{task.name}</h3>
          <p>Release Date: {task.releaseDate}</p>
          <p>Due Date: {task.dueDate}</p>
        </div>
      ))} */}
      <CreateTaskForm onCreateTask={handleCreateTask} />
    </>
  );
}

export default App;
