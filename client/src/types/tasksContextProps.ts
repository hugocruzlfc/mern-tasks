import { TaskDataResponse } from "./taskDataResponse";
import { TaskInput } from "./taskInput";

export interface TasksContextProps {
  tasks: TaskDataResponse[];
  handleCreateTask: (values: TaskInput) => Promise<void>;
  // deleteTask: (id: string) => Promise<void>;
  // updateTask: (id: string, values: TaskInput) => Promise<void>;
  // getTasks: () => Promise<void>;
}
