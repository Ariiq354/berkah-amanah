import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "#/components/ui/toast";

import { createAkunFn } from "../server/fn";
import type { CreateAkunInput } from "../server/model";

export function useCreateAkunMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (value: CreateAkunInput) => {
      await createAkunFn({ data: value });
    },
    onSuccess: () => {
      toast.add({
        type: "success",
        title: "Berhasil Menambah Akun",
        description: "Anda telah berhasil menambah akun.",
      });
    },
    onError: (error) => {
      toast.add({
        type: "error",
        title: "Gagal Menambah Akun",
        description:
          error.message || "Gagal Menambah Akun, silahkan coba lagi.",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["akun"] });
    },
  });
}
