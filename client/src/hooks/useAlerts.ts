import { toast } from "sonner";
import { AlertMessage, AlertType } from "../types";

export const useAlerts = () => {
  const handleRenderToast = (message: AlertMessage) => {
    if (message?.error) {
      handleRenderInfo(message?.error, AlertType.ERROR);
    }
    if (message?.success) {
      handleRenderInfo(message?.success, AlertType.SUCCESS);
    }
    if (message?.info) {
      handleRenderInfo(message?.info, AlertType.INFO);
    }
    if (message?.warning) {
      handleRenderInfo(message?.warning, AlertType.WARNING);
    }
  };

  const handleRenderInfo = (
    messages: string[],
    alertType: keyof AlertMessage
  ) => {
    messages.forEach((message) => {
      toast[alertType](message, {
        duration: 5000,
      });
    });
  };

  return handleRenderToast;
};
