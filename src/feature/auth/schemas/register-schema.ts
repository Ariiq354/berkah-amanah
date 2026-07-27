import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, "Wajib diisi"),
    username: z.string().min(1, "Wajib diisi"),
    password: z.string().min(8, "Wajib diisi minimal 8 karakter"),
    confirmPassword: z.string().min(8, "Wajib diisi minimal 8 karakter"),
    idKelompok: z.number().min(1, "Wajib diisi"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak sesuai",
    path: ["confirmPassword"],
  });

export type RegisterSchema = Omit<
  z.infer<typeof registerSchema>,
  "idKelompok"
> & {
  idKelompok: number | undefined;
};
