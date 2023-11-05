import axios from "axios";

const API_URL = "http://localhost:4000/api";

export const registerUser = async (newUser: any) => {
  return await axios.post(`${API_URL}/register`, newUser);
};
