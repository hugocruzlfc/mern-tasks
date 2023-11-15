import { UserInput } from "./userInput";

export interface UserDataResponse extends Omit<UserInput, "password"> {
  id: string;
}
