import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { toast } from "#/components/ui/toast";
import { authClient } from "#/lib/auth-client";

import type { LoginSchema } from "../schemas/login-schema";

export function useLoginMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (value: LoginSchema) => {
      const res = await authClient.signIn.username({
        username: value.username,
        password: value.password,
        rememberMe: value.rememberMe,
      });

      if (res.error) {
        if (res.error.code === "INVALID_USERNAME_OR_PASSWORD") {
          throw new Error("Username atau password salah. Silahkan coba lagi.");
        } else {
          throw new Error(
            res.error.message || "Gagal login, silahkan coba lagi.",
          );
        }
      }

      return res.data;
    },
    onSuccess: () => {
      toast.add({
        type: "success",
        title: "Berhasil Login",
        description: "Anda telah berhasil login.",
      });
      navigate({ to: "/dashboard" });
    },
    onError: (error) => {
      toast.add({
        type: "error",
        title: "Gagal Login",
        description: error.message || "Gagal login, silahkan coba lagi.",
      });
    },
  });
}
