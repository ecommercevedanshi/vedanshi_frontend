import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name is required",
      })
      .min(5, "Name must be at least 5 characters"),

    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email is required",
      })
      .email("Invalid email address"),

    phone: z
      .string({
        required_error: "Phone number is required",
        invalid_type_error: "Phone number is required",
      })
      .min(7, "Invalid phone number"),

    countryCode: z.number({
      required_error: "Country code is required",
      invalid_type_error: "Country code is required",
    }),

    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password is required",
      })
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),

    confirmPassword: z.string({
      required_error: "Confirm password is required",
      invalid_type_error: "Confirm password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });