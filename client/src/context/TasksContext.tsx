import { createContext, useState, useContext } from "react";
import { TOAST_DESCRIPTIONS, TaskDataResponse, TaskInput } from "../types";
import { toast } from "sonner";
import { createTask } from "../api";

export interface TasksContextProps {
  tasks: TaskDataResponse[];
  handleCreateTask: (values: TaskInput) => Promise<void>;
  // deleteTask: (id: string) => Promise<void>;
  // updateTask: (id: string, values: TaskInput) => Promise<void>;
  // getTasks: () => Promise<void>;
}

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
  const [tasks, setTasks] = useState<TaskDataResponse[]>([]);

  const handleCreateTask = async (values: TaskInput) => {
    const toastLoading = toast.loading(TOAST_DESCRIPTIONS.LOADING);
    try {
      const response = await createTask(values);
      setTasks([...tasks, response.data]);
      toast.dismiss(toastLoading);
      const toastSuccess = toast.success(TOAST_DESCRIPTIONS.TASK_CREATED);
      toast.dismiss(toastSuccess);
    } catch (error) {
      toast.error(TOAST_DESCRIPTIONS.ERROR);
    } finally {
      toast.dismiss(toastLoading);
    }
  };

  return (
    <TasksContext.Provider value={{ tasks, handleCreateTask }}>
      {children}
    </TasksContext.Provider>
  );
};
