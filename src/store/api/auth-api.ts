import { BASE_URL } from "@/constant/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "../types/api-types";
import type { Session, VerifyEmailSuccess } from "../types/auth-types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["SESSION"],
  endpoints: (builder) => ({
    sendOtp: builder.mutation<ApiResponse, object>({
      query: (body) => ({
        url: `/auth/send-otp`,
        method: "POST",
        body,
      }),
    }),
    verifyEmail: builder.mutation<ApiResponse<VerifyEmailSuccess>, object>({
      query: (body) => ({
        url: "/auth/verify-email",
        method: "POST",
        body,
      }),
    }),
    restoreSession: builder.query<Session, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<Session>): Session => {
        return response.data!;
      },
    }),
  }),
});
export const { useSendOtpMutation, useVerifyEmailMutation, useLazyRestoreSessionQuery, useRestoreSessionQuery } = authApi;
