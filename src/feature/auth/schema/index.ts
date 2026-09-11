import z from "zod";

export const getStartSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export type GetStartFormValues = z.infer<typeof getStartSchema>;
