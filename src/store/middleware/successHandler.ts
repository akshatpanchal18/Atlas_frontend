import { Toast } from "@/config/toast";
import { isFulfilled } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";

const includedEndpoints = ["sendOtp", "verifyEmail", "resetPassword", "login"];

type RTKQueryAction = {
  meta: {
    arg: {
      endpointName: string;
    };
  };
  payload?: {
    message?: string;
  };
};

export const successMiddleware: Middleware = () => (next) => (action) => {
  if (isFulfilled(action)) {
    const { endpointName } = (action as RTKQueryAction).meta.arg;

    if (includedEndpoints.includes(endpointName)) {
      const message = (action as RTKQueryAction).payload?.message;

      if (message) {
        Toast.success(message);
      }
    }
  }

  return next(action);
};
