import axios from "axios";
const PORT = 5005;
const BASE_URL = `http://localhost:${PORT}`;

// tasks/get get all tasks
export const getTasks = async () => {
  const response = await axios.get(`${BASE_URL}/tasks/all`);
  return response.data;
};

// tasks/post create a new task
export const createTask = async (taskName: string) => {
  const response = await axios.post(`${BASE_URL}/tasks/add`, {
    name: taskName,
  });
  return response.data;
};
