import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.union([z.string().email(), z.string().min(6).max(50)]),
  password: z.string().min(6).max(100),
});

export const signUpFormSchema = z
  .object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const verifyUserEmailSchema = z.object({
  token: z.string(),
  email: z.string().email(),
});

export const recoverPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z
  .object({
    email: z.string().email(),
    token: z.string(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
