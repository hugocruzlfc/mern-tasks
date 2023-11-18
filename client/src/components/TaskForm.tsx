import React, { useEffect } from "react";
import { AUTH_CONTAINER_CLASS, INPUT_CLASS } from "../utils";
import AuthCards from "./AuthCards";
import { useTasksContext } from "../context";
import { useForm } from "react-hook-form";
import { TaskDataResponse, TaskInput } from "../types";
import { useNavigate } from "react-router-dom";

export interface TaskFormProps {
  formLabel: string;
  buttonLabel: string;
  task: TaskDataResponse | null;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  formLabel,
  buttonLabel,
  task,
}) => {
  const navigate = useNavigate();
  const { handleCreateTask, handleUpdateTask } = useTasksContext();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    if (task) {
      setValue("title", task.title);
      setValue("description", task.description);
    }
  }, [task]);

  const onSubmit = handleSubmit((values) => {
    if (task) {
      handleUpdateTask(task._id, values as TaskInput);
      reset();
      navigate("/tasks");
    } else {
      handleCreateTask(values as TaskInput);
      reset();
    }
  });

  return (
    <div className={`${AUTH_CONTAINER_CLASS}`}>
      <AuthCards title={formLabel}>
        <form onSubmit={onSubmit}>
          <input
            className={`${INPUT_CLASS}`}
            type="text"
            placeholder="Title"
            autoFocus
            {...register("title", {
              required: true,
            })}
          />
          {errors.title && <p className="text-red-500">Title is required</p>}
          <textarea
            className={`${INPUT_CLASS}`}
            placeholder="Description"
            {...register("description", {
              required: true,
            })}
          />
          {errors.description && (
            <p className="text-red-500">Description is required</p>
          )}
          <button
            type="submit"
            className="btn btn-outline my-2 p-2"
          >
            {buttonLabel}
          </button>
        </form>
      </AuthCards>
    </div>
  );
};
