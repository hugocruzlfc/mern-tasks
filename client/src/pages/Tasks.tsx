import React from "react";
import { useTasksContext } from "../context";
import { TaskCards } from "../components";

export interface TasksProps {}

const Tasks: React.FC<TasksProps> = ({}) => {
  const { tasks } = useTasksContext();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pl-4">
      {tasks.map((task) => (
        <TaskCards
          key={task._id}
          task={task}
        />
      ))}
    </div>
  );
};

export default Tasks;
