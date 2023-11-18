import { AlertMessage } from "./alertMessage";
import { AuthStatus } from "./authStatus";
import { UserDataResponse } from "./userDataResponse";
import { UserInput } from "./userInput";

export interface AuthContextProps {
  user: UserDataResponse | null;
  authStatus: AuthStatus;
  errors: AlertMessage | null;
  signup: (values: UserInput) => Promise<boolean>;
  signin: (values: UserInput) => Promise<boolean>;
  logout: () => Promise<void>;
  //setUser: React.Dispatch<React.SetStateAction<UserDataResponse | null>>;
}
