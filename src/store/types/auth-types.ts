import type { ApiError } from "./api-types";

export interface Session {
  accessToken: string;
}
export type SendOtpError = ApiError;
export interface VerifyEmailSuccess {
  accessToken: string;
  onboarding: boolean;
}
