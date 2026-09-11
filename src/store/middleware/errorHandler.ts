import { Toast } from "@/config/toast";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";

const ignoredEndpoints = ["sessionValidation"];

interface ErrorDetails {
  message?: string;
}

interface ErrorPayload {
  data?: {
    message?: string;
  };
}

interface ErrorMetaArg {
  endpointName?: string;
}

interface ErrorMeta {
  arg?: ErrorMetaArg;
}

interface RejectedAction {
  type: string;
  payload?: ErrorPayload;
  error?: ErrorDetails;
  meta?: ErrorMeta;
}

export const errorMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const rejectedAction = action as RejectedAction;
    const endpoint = rejectedAction.meta?.arg?.endpointName;

    if (endpoint && !ignoredEndpoints.includes(endpoint)) {
      console.log("ERROR_HANDLER=>", rejectedAction.payload);

      const message =
        rejectedAction.payload?.data?.message ||
        rejectedAction.error?.message ||
        "Something went wrong";

      Toast.error(message);
    }
  }

  return next(action);
};
