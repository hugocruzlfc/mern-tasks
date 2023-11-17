import { TaskInput } from "./taskInput";

export interface TaskDataResponse extends TaskInput {
  id: string;
  createdAt: string;
  updatedAt: string;
}
