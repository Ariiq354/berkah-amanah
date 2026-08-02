import { z } from "zod";

import { paginationSchema } from "#/lib/schema";

export const createAkunSchema = z.object({
  kodeAkun: z.string().min(1, "Kode akun wajib diisi"),
  namaAkun: z.string().min(1, "Nama akun wajib diisi"),
  status: z.boolean(),
});

export type CreateAkun = z.infer<typeof createAkunSchema>;
export type CreateAkunInput = z.input<typeof createAkunSchema>;

export const updateAkunSchema = createAkunSchema.partial().extend({
  id: z.number(),
});

export type UpdateAkun = z.infer<typeof updateAkunSchema>;
export type UpdateAkunInput = z.input<typeof updateAkunSchema>;

export const filterAkunSchema = paginationSchema.extend({
  search: z.string().optional(),
  status: z.boolean().optional(),
});

export type FilterAkun = z.infer<typeof filterAkunSchema>;
