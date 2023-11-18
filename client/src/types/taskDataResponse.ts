import { TaskInput } from "./taskInput";

export interface TaskDataResponse extends TaskInput {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
