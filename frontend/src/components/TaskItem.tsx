import Task from "../models/Task";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <div>
      {task.name} Release: {task.releaseDate} Due: {task.dueDate}
    </div>
  );
};
export default TaskItem;
