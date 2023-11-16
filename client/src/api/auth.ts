import { axiosInstance } from "./axios";

import { UserInput } from "../types";

export const registerUser = (newUser: UserInput) =>
  axiosInstance.post("/register", newUser);

export const loginUser = (newUser: UserInput) =>
  axiosInstance.post("/login", newUser);

export const verifyToken = () => axiosInstance.get("/verify");
