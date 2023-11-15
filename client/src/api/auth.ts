import axios from "axios";
import { API_URL } from "../utils";
import { UserInput } from "../types";

export const registerUser = async (newUser: UserInput) => {
  return await axios.post(`${API_URL}/register`, newUser);
};

export const loginUser = async (newUser: UserInput) => {
  return await axios.post(`${API_URL}/login`, newUser);
};
