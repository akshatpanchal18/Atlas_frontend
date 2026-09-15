import { Toast } from "@/config/toast";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";
import type { ApiError } from "../types/api-types";

const ignoredEndpoints = ["restoreSession"];

interface ErrorDetails {
  message?: string;
}

interface ErrorPayload {
  data?: ApiError;
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

    // Ignore specific endpoints
    if (endpoint && ignoredEndpoints.includes(endpoint)) {
      return next(action);
    }

    const apiError = rejectedAction.payload?.data;

    // Don't show a generic toast when the API
    // contains field-level validation errors.
    if ((apiError?.errors?.length ?? 0) > 0) {
      return next(action);
    }

    const message = apiError?.message || rejectedAction.error?.message || "Something went wrong";

    Toast.error(message);
  }

  return next(action);
};
