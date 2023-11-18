import React from "react";
import { TaskDataResponse } from "../types";
import { useTasksContext } from "../context";
import { Link } from "react-router-dom";

export interface TaskCardsProps {
  task: TaskDataResponse;
}

export const TaskCards: React.FC<TaskCardsProps> = ({ task }) => {
  const { handleDeleteTask, handleUpdateTask } = useTasksContext();
  const createdDate = new Date(task?.createdAt).toLocaleDateString();

  const handleDoneTask = (taskID: string) => {
    const taskUpdated = {
      ...task,
      done: true,
    };
    handleUpdateTask(taskID, taskUpdated);
  };

  return (
    <div className="card card-normal bg-base-100 shadow-xl w-96 mb-4">
      <div className="p-5">
        <div className="flex justify-between">
          <h2 className="card-title">{task?.title}</h2>
          <p className="text-slate-300">{createdDate}</p>
        </div>
        <p className="text-slate-300">{task?.description}</p>

        <div className="flex justify-between mt-5">
          {!task?.done ? (
            <span className="loading loading-spinner text-success"></span>
          ) : (
            <div className="badge badge-accent badge-outline">Done</div>
          )}
          <div className="flex justify-end">
            <Link
              className="btn btn-active btn-xs "
              to={`/edit/${task._id}`}
            >
              Edit
            </Link>
            <button
              className="btn  btn-xs bg-red-700 ml-2"
              onClick={() => handleDeleteTask(task._id)}
            >
              Delete
            </button>
            {!task?.done && (
              <button
                className="btn  btn-xs btn-success ml-2"
                onClick={() => handleDoneTask(task._id)}
              >
                Done
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
