import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Wajib diisi"),
  password: z.string().min(8, "Wajib diisi minimal 8 karakter"),
  rememberMe: z.boolean(),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(1, "Wajib diisi"),
    username: z.string().min(1, "Wajib diisi"),
    password: z.string().min(8, "Wajib diisi minimal 8 karakter"),
    confirmPassword: z.string().min(8, "Wajib diisi minimal 8 karakter"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak sesuai",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
