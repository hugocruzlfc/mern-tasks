import { createContext, useState, useContext } from "react";
import { registerUser } from "../api/auth";
import { UserInput } from "../types";
import { UserDataResponse } from "../types/userDataResponse";

export interface AuthContextProps {
  user: UserDataResponse | null;
  isAuthenticated: boolean;
  signup: (values: UserInput) => Promise<void>;
  //setUser: React.Dispatch<React.SetStateAction<UserDataResponse | null>>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserDataResponse | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const signup = async (values: UserInput) => {
    try {
      const response = await registerUser(values);
      console.log(response);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
