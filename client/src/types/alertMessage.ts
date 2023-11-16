export type AlertMessage = {
  [key in AlertKey]?: string[];
};

type AlertKey = "error" | "success" | "info" | "warning";

export enum AlertType {
  ERROR = "error",
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
}
