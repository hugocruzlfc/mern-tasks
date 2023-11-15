import { AxiosError } from "axios";
import { ApiErrorMessage } from "../types";

export function parseErrors(errorResponse: AxiosError) {
  const responseData = errorResponse.response?.data as ApiErrorMessage;

  const errorMessages: string[] = Array.isArray(responseData.message)
    ? responseData.message
    : Array.isArray(responseData.errors)
    ? responseData.errors
    : [];

  // const axiosError = error as AxiosError;
  // const responseData = axiosError.response?.data;
  // let errorMessages: string[] = [];
  // if (responseData && typeof responseData === "object") {
  //   if ("message" in responseData) {
  //     errorMessages = Array.isArray(responseData.message)
  //       ? responseData.message
  //       : [responseData.message];
  //   } else if ("errors" in responseData) {
  //     errorMessages = Array.isArray(responseData.errors)
  //       ? responseData.errors
  //       : [responseData.errors];
  //   }
  // }

  return errorMessages;
}
