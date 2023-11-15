import { createContext, useState, useContext, useEffect } from "react";
import { loginUser, registerUser } from "../api";
import { UserInput } from "../types";
import { UserDataResponse } from "../types/userDataResponse";
import { AxiosError } from "axios";
import { parseErrors } from "../utils";

export interface AuthContextProps {
  user: UserDataResponse | null;
  isAuthenticated: boolean;
  errors: string[];
  signup: (values: UserInput) => Promise<void>;
  signin: (values: UserInput) => Promise<void>;
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
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signup = async (values: UserInput) => {
    try {
      const response = await registerUser(values);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      const parsedErrorMessages = parseErrors(error as AxiosError);
      setErrors(parsedErrorMessages);
    }
  };

  const signin = async (values: UserInput) => {
    try {
      const response = await loginUser(values);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      const parsedErrorMessages = parseErrors(error as AxiosError);
      setErrors(parsedErrorMessages);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, errors, signup, signin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
