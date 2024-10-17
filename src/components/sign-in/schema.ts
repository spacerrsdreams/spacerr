import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.union([z.string().email(), z.string().min(6).max(50)]),
  password: z.string().min(8).max(100),
});
