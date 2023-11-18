import React from "react";
import { FormLabel } from "../types";
import { TaskForm } from "../components";
import { useParams } from "react-router-dom";
import { useTasksContext } from "../context";

const TaskFormPage: React.FC = () => {
  const { handleGetTaskById } = useTasksContext();
  const params = useParams();
  const formLabel = params?.id ? FormLabel.EDIT_TASK : FormLabel.CREATE_TASK;
  const buttonLabel = params?.id ? "Edit" : "Create";
  const currentTask = params?.id ? handleGetTaskById(params.id) : null;

  return (
    <TaskForm
      formLabel={formLabel}
      buttonLabel={buttonLabel}
      task={currentTask}
    />
  );
};

export default TaskFormPage;
