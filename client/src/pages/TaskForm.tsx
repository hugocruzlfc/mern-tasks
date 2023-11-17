import React from "react";
import { useForm } from "react-hook-form";
import { AUTH_CONTAINER_CLASS, INPUT_CLASS } from "../utils";
import { AuthCards } from "../components";
import { FormLabel, TaskInput } from "../types";
import { useTasksContext } from "../context";

export interface TaskFormProps {}

const TaskForm: React.FC<TaskFormProps> = ({}) => {
  const { handleCreateTask } = useTasksContext();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = handleSubmit((values) => {
    handleCreateTask(values as TaskInput);
    reset();
  });

  return (
    <div className={`${AUTH_CONTAINER_CLASS}`}>
      <AuthCards title={FormLabel.CREATE_TASK}>
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
            Create
          </button>
        </form>
      </AuthCards>
    </div>
  );
};

export default TaskForm;
