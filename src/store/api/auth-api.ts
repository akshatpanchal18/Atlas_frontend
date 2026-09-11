import { BASE_URL } from "@/constant/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "../types/api-types";
import type { Session } from "../types/auth-types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["SESSION"],
  endpoints: (builder) => ({
    sendOtp: builder.mutation({
      query: (body) => ({
        url: `/auth/send-otp`,
        method: "POST",
        body,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (body) => ({
        url: "/auth/verify-email",
        method: "POST",
        body,
      }),
    }),
    restoreSession: builder.query<ApiResponse<Session>, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
    }),
  }),
});
export const {
  useSendOtpMutation,
  useVerifyEmailMutation,
  useLazyRestoreSessionQuery,
  useRestoreSessionQuery,
} = authApi;
