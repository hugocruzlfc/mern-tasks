import { TaskDataResponse } from "./taskDataResponse";
import { TaskInput } from "./taskInput";

export interface TasksContextProps {
  tasks: TaskDataResponse[];
  handleCreateTask: (values: TaskInput) => Promise<void>;
  handleDeleteTask: (id: string) => Promise<void>;
  handleGetTaskById: (id: string) => TaskDataResponse | null;
  handleUpdateTask: (id: string, values: TaskInput) => Promise<void>;
  // getTasks: () => Promise<void>;
}
