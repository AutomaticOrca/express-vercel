import Task from "../models/Task";
import TaskItem from "./TaskItem";

interface TasksListProps {
  tasks: Task[];
}

const TasksList: React.FC<TasksListProps> = ({ tasks }) => {
  return tasks.map((task, index) => <TaskItem key={task._id} task={task} />);
};

export default TasksList;
