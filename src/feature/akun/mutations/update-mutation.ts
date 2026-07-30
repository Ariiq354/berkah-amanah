import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "#/components/ui/toast";

import { updateAkunFn } from "../server/fn";
import type { UpdateAkunInput } from "../server/model";

export function useUpdateAkunMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (value: UpdateAkunInput) => {
      await updateAkunFn({ data: value });
    },
    onSuccess: () => {
      toast.add({
        type: "success",
        title: "Berhasil Update Akun",
        description: "Anda telah berhasil update akun.",
      });
    },
    onError: (error) => {
      toast.add({
        type: "error",
        title: "Gagal Update Akun",
        description: error.message || "Gagal Update Akun, silahkan coba lagi.",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["akun"] });
    },
  });
}
