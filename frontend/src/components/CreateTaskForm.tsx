import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface CreateTaskFormProps {
  onCreateTask: (taskName: string) => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onCreateTask }) => {
  const [taskName, setTaskName] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskName.trim() !== "") {
      onCreateTask(taskName);
      setTaskName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        placeholder="Add a Task"
      />
      <Button type="submit">Create Task</Button>
    </form>
  );
};

export default CreateTaskForm;
