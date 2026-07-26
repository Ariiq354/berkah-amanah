import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Wajib diisi"),
  password: z.string().min(1, "Wajib diisi"),
  rememberMe: z.boolean(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
