import React from "react";
import { Link } from "react-router-dom";

export interface TasksProps {}

const Tasks: React.FC<TasksProps> = ({}) => {
  return (
    <div>
      <Link to="/add-task">to TaskForm</Link>
    </div>
  );
};

export default Tasks;
