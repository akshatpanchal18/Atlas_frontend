import z from "zod";

export const getStartSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Please enter a valid email address"),
});

export type GetStartFormValues = z.infer<typeof getStartSchema>;
export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "Please enter the 6-digit verification code")
    .regex(/^\d{6}$/, "Verification code must contain only numbers"),
});

export type OtpFormValues = z.infer<typeof otpSchema>;
