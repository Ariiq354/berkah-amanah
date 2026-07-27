import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { toast } from "#/components/ui/toast";
import { authClient } from "#/lib/auth-client";

import type { LoginSchema } from "../schemas/login-schema";
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

export function useSignOutMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const res = await authClient.signOut();

      if (res.error) {
        throw new Error(res.error.message || "Gagal logout.");
      }

      return res.data;
    },
    onSuccess: () => {
      toast.add({
        type: "success",
        title: "Berhasil Logout",
        description: "Anda telah berhasil logout.",
      });

      navigate({ to: "/" });
    },
    onError: (error) => {
      toast.add({
        type: "error",
        title: "Gagal Logout",
        description: error.message,
      });
    },
  });
}
