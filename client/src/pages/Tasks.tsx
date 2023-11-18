import React from "react";
import { Link } from "react-router-dom";
import { useTasksContext } from "../context";

export interface TasksProps {}

const Tasks: React.FC<TasksProps> = ({}) => {
  const { tasks } = useTasksContext();
  return <div></div>;
};

export default Tasks;
