import { useMutation } from "@tanstack/react-query";

import { toast } from "#/components/ui/toast";
import { authClient } from "#/lib/auth-client";

import type { ChangePasswordSchema } from "../schemas/change-password-schema";

export function useChangePasswordMutation() {
  return useMutation({
    mutationFn: async (value: ChangePasswordSchema) => {
      const res = await authClient.changePassword({
        newPassword: value.newPassword,
        currentPassword: value.currentPassword,
      });

      if (res.error) {
        throw new Error(res.error.message || "Gagal mengubah password.");
      }

      return res.data;
    },
    onSuccess: () => {
      toast.add({
        type: "success",
        title: "Berhasil Ubah Password",
        description: "Password Anda telah berhasil diubah.",
      });
    },
    onError: (error) => {
      toast.add({
        type: "error",
        title: "Gagal Ubah Password",
        description:
          error.message || "Gagal mengubah password, silahkan coba lagi.",
      });
    },
  });
}
