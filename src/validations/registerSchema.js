import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(5, "Name must be at least 5 characters"),

    email: z
      .string()
      .email("Invalid email address"),

    phone: z
      .string()
      .min(7, "Invalid phone number"),

    countryCode: z.number(),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });