import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.union([z.string().email(), z.string().min(6).max(50)]),
  password: z.string().min(8).max(100),
});

export const signUpFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(100),
});
