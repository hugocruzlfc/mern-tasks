import { createContext, useState, useContext, useEffect } from "react";
import { TOAST_DESCRIPTIONS, TaskDataResponse, TaskInput } from "../types";
import { toast } from "sonner";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../api";
import { useAuthContext } from "./AuthContext";
import { TasksContextProps } from "../types";

const TasksContext = createContext<TasksContextProps | null>(null);

export const useTasksContext = () => {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error(
      "useTasksContext must be used within an TasksContextProvider"
    );
  }
  return context;
};

export interface TasksProviderProps {
  children: React.ReactNode;
}

export const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
  const { authStatus } = useAuthContext();
  const [tasks, setTasks] = useState<TaskDataResponse[]>([]);

  useEffect(() => {
    if (authStatus === "authenticated") {
      handleGetTasks();
    }
  }, [authStatus]);

  const handleCreateTask = async (values: TaskInput) => {
    const toastLoading = toast.loading(TOAST_DESCRIPTIONS.LOADING);
    try {
      const response = await createTask(values);
      setTasks([...tasks, response.data]);
      toast.dismiss(toastLoading);
      const toastSuccess = toast.success(TOAST_DESCRIPTIONS.TASK_CREATED);
      toast.dismiss(toastSuccess);
    } catch (error) {
      console.log(error);
      toast.error(TOAST_DESCRIPTIONS.ERROR);
    } finally {
      toast.dismiss(toastLoading);
    }
  };

  const handleUpdateTask = async (taskID: string, values: TaskInput) => {
    const toastLoading = toast.loading(TOAST_DESCRIPTIONS.LOADING);
    try {
      const response = await updateTask(taskID, values);
      const tasksWithoutCurrentTask = tasks.filter(
        (task) => task._id !== taskID
      );
      setTasks(
        [...tasksWithoutCurrentTask, response.data].sort((a, b) =>
          a.createdAt.localeCompare(b.createdAt)
        )
      );
      toast.dismiss(toastLoading);
      const toastSuccess = toast.success(TOAST_DESCRIPTIONS.TASK_UPDATED);
      toast.dismiss(toastSuccess);
    } catch (error) {
      console.log(error);
      toast.error(TOAST_DESCRIPTIONS.ERROR);
    } finally {
      toast.dismiss(toastLoading);
    }
  };

  const handleGetTasks = async () => {
    const toastLoading = toast.loading(TOAST_DESCRIPTIONS.LOADING);
    try {
      const response = await getTasks();
      setTasks(response.data);
      toast.dismiss(toastLoading);
    } catch (error) {
      console.log(error);
      toast.error(TOAST_DESCRIPTIONS.ERROR);
    } finally {
      toast.dismiss(toastLoading);
    }
  };

  const handleDeleteTask = async (id: string) => {
    const toastLoading = toast.loading(TOAST_DESCRIPTIONS.LOADING);
    try {
      const response = await deleteTask(id);
      if (response.status === 204) {
        const newTasks = tasks.filter((task) => task._id !== id);
        setTasks(newTasks);
      }
      toast.dismiss(toastLoading);
      const toastSuccess = toast.success(TOAST_DESCRIPTIONS.TASK_DELETED);
      toast.dismiss(toastSuccess);
    } catch (error) {
      console.log(error);
      toast.error(TOAST_DESCRIPTIONS.ERROR);
    } finally {
      toast.dismiss(toastLoading);
    }
  };

  const handleGetTaskById = (id: string) => {
    const toastLoading = toast.loading(TOAST_DESCRIPTIONS.LOADING);
    const currentTask = tasks.find((task) => task._id === id) ?? null;
    toast.dismiss(toastLoading);
    return currentTask;
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        handleCreateTask,
        handleDeleteTask,
        handleGetTaskById,
        handleUpdateTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
