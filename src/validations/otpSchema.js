import { z } from "zod";

export const otpSchema = z.object({
  otp: z
    .string()
    .min(4, "OTP must be 4 digits")
    .max(6, "Invalid OTP"),
});