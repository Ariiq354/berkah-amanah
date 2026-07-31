import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "#/components/ui/toast";

import { deleteAkunFn } from "../server/fn";

export function useDeleteAkunMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: number[]) => {
      await deleteAkunFn({ data: ids });
    },
    onSuccess: () => {
      toast.add({
        type: "success",
        title: "Berhasil Menghapus Akun",
        description: "Anda telah berhasil menghapus akun.",
      });
    },
    onError: (error) => {
      toast.add({
        type: "error",
        title: "Gagal Menghapus Akun",
        description:
          error.message || "Gagal Menghapus Akun, silahkan coba lagi.",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["akun"] });
    },
  });
}
