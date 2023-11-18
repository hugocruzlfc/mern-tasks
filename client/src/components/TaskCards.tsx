import React from "react";
import { TaskDataResponse } from "../types";
import { useTasksContext } from "../context";
import { Link } from "react-router-dom";

export interface TaskCardsProps {
  task: TaskDataResponse;
}

export const TaskCards: React.FC<TaskCardsProps> = ({ task }) => {
  const { handleDeleteTask } = useTasksContext();
  const createdDate = new Date(task?.createdAt).toLocaleDateString();

  return (
    <div className="card card-normal bg-base-100 shadow-xl w-96 mb-4">
      <div className="p-5">
        <div className="flex justify-between">
          <h2 className="card-title">{task?.title}</h2>
          <p className="text-slate-300">{createdDate}</p>
        </div>
        <p className="text-slate-300">{task?.description}</p>
        <div className="card-actions justify-end">
          <Link
            className="btn btn-active btn-xs "
            to={`/edit/${task._id}`}
          >
            Edit
          </Link>
          <button
            className="btn  btn-xs bg-red-700"
            onClick={() => handleDeleteTask(task._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
