import React from "react";
import { useForm } from "react-hook-form";
import { INPUT_CLASS } from "../utils";

export interface TaskFormProps {}

const TaskForm: React.FC<TaskFormProps> = ({}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);
  });

  return (
    <div>
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
    </div>
  );
};

export default TaskForm;
