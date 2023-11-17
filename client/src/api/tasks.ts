import { TaskInput } from "../types";
import { axiosInstance } from "./axios";

export const getTasks = () => axiosInstance.get("/tasks");

export const getTaskById = (id: string) => axiosInstance.get(`/tasks/${id}`);

export const createTask = (newTask: TaskInput) =>
  axiosInstance.post("/tasks", newTask);

export const updateTask = (id: string, updatedTask: TaskInput) =>
  axiosInstance.patch(`/tasks/${id}`, updatedTask);

export const deleteTask = (id: string) => axiosInstance.delete(`/tasks/${id}`);
