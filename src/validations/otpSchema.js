import { z } from "zod";

export const otpSchema = z.object({
  otp: z
    .string({
      required_error: "OTP is required",
      invalid_type_error: "OTP is required",
    })
    .min(4, "OTP must be at least 4 digits")
    .max(6, "Invalid OTP"),
});