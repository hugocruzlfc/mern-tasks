import { createContext, useState, useContext, useEffect } from "react";
import { loginUser, registerUser } from "../api";
import { AlertMessage, UserInput } from "../types";
import { UserDataResponse } from "../types/userDataResponse";
import { AxiosError } from "axios";
import { parseErrors } from "../utils";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export interface AuthContextProps {
  user: UserDataResponse | null;
  isAuthenticated: boolean;
  errors: AlertMessage | null;
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
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDataResponse | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [errors, setErrors] = useState<AlertMessage | null>(null);

  useEffect(() => {
    const cookies = Cookies.get("token");
  }, []);

  // useEffect(() => {
  //   if (errors) {
  //     const timer = setTimeout(() => {
  //       setErrors(null);
  //     }, 5000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [errors]);

  const signup = async (values: UserInput) => {
    const toastLoading = toast.loading("Loading data");
    try {
      const response = await registerUser(values);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      const parsedErrorMessages = parseErrors(error as AxiosError);
      setErrors({ error: parsedErrorMessages });
    } finally {
      toast.dismiss(toastLoading);
    }
  };

  const signin = async (values: UserInput) => {
    const toastLoading = toast.loading("Loading data");
    try {
      const response = await loginUser(values);
      setUser(response.data);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      const parsedErrorMessages = parseErrors(error as AxiosError);
      setErrors({ error: parsedErrorMessages });
    } finally {
      toast.dismiss(toastLoading);
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
