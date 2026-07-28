import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { toast } from "#/components/ui/toast";
import { authClient } from "#/lib/auth-client";

import type { RegisterSchema } from "../schemas/register-schema";

export function useRegisterMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (value: RegisterSchema) => {
      const res = await authClient.signUp.email({
        name: value.name,
        email: `${value.username}@berkahamanah.local`,
        username: value.username,
        password: value.password,
        displayUsername: value.name,
        idKelompok: value.idKelompok!,
      });

      if (res.error) {
        if (res.error.code === "USERNAME_IS_ALREADY_TAKEN") {
          throw new Error(
            "Username sudah digunakan. Silahkan gunakan username lain.",
          );
        } else {
          throw new Error(
            res.error.message || "Gagal registrasi, silahkan coba lagi.",
          );
        }
      }

      return res.data;
    },
    onSuccess: () => {
      toast.add({
        type: "success",
        title: "Berhasil Daftar",
        description: "Akun Anda telah berhasil didaftarkan. Silahkan login.",
      });
      navigate({ to: "/" });
    },
    onError: (error) => {
      toast.add({
        type: "error",
        title: "Gagal registrasi",
        description: error.message || "Gagal registrasi, silahkan coba lagi.",
      });
    },
  });
}
