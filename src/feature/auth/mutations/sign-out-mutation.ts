import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { toast } from "#/components/ui/toast";
import { authClient } from "#/lib/auth-client";

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
