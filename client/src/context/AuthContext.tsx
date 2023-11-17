import { createContext, useState, useContext, useEffect } from "react";
import { loginUser, registerUser, verifyToken } from "../api";
import {
  AlertMessage,
  AuthStatus,
  TOAST_DESCRIPTIONS,
  UserInput,
} from "../types";
import { UserDataResponse } from "../types/userDataResponse";
import { AxiosError } from "axios";
import { parseErrors } from "../utils";
import Cookies from "js-cookie";
import { toast } from "sonner";

export interface AuthContextProps {
  user: UserDataResponse | null;
  authStatus: AuthStatus;
  errors: AlertMessage | null;
  signup: (values: UserInput) => Promise<void>;
  signin: (values: UserInput) => Promise<void>;
  //setUser: React.Dispatch<React.SetStateAction<UserDataResponse | null>>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserDataResponse | null>(null);
  const [authStatus, setAuthStatus] = useState<AuthStatus>("checking");
  const [errors, setErrors] = useState<AlertMessage | null>(null);
  const cookieToken = Cookies.get("token");

  useEffect(() => {
    checkAuth();
  }, [cookieToken]);

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
      handleUpdateStates(response.data);
    } catch (error) {
      const parsedErrorMessages = parseErrors(error as AxiosError);
      setErrors({ error: parsedErrorMessages });
      handleUpdateStates();
    } finally {
      toast.dismiss(toastLoading);
    }
  };

  const signin = async (values: UserInput) => {
    const toastLoading = toast.loading("Loading data");
    try {
      const response = await loginUser(values);
      handleUpdateStates(response.data);
    } catch (error) {
      const parsedErrorMessages = parseErrors(error as AxiosError);
      setErrors({ error: parsedErrorMessages });
      handleUpdateStates();
    } finally {
      toast.dismiss(toastLoading);
    }
  };

  const handleUpdateStates = (userData?: UserDataResponse) => {
    if (userData) {
      setUser(userData);
      setAuthStatus("authenticated");
    } else {
      setUser(null);
      setAuthStatus("no-authenticated");
    }
  };

  const checkAuth = async () => {
    const toastLoading = toast.loading(TOAST_DESCRIPTIONS.LOADING);
    setAuthStatus("checking");
    if (cookieToken) {
      try {
        const response = await verifyToken();
        handleUpdateStates(response.data);
      } catch (error) {
        handleUpdateStates();
      }
    } else {
      handleUpdateStates();
    }
    toast.dismiss(toastLoading);
  };

  return (
    <AuthContext.Provider value={{ user, authStatus, errors, signup, signin }}>
      {children}
    </AuthContext.Provider>
  );
};
