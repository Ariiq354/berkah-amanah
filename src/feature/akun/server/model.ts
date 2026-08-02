import { z } from "zod";

import { paginationSchema } from "#/lib/schema";

export const KATEGORI_AKUN_VALUES = [
  "Aktiva",
  "Pasiva",
  "Pendapatan",
  "Biaya",
] as const;

export type KategoriAkun = (typeof KATEGORI_AKUN_VALUES)[number];

export const NORMAL_BALANCE_VALUES = ["Debit", "Kredit"] as const;

export type NormalBalance = (typeof NORMAL_BALANCE_VALUES)[number];

export const createAkunSchema = z.object({
  kodeAkun: z.string().min(1, "Kode akun wajib diisi"),
  namaAkun: z.string().min(1, "Nama akun wajib diisi"),
  kategori: z.enum(KATEGORI_AKUN_VALUES).optional().nullable(),
  normalBalance: z.enum(NORMAL_BALANCE_VALUES).optional().nullable(),
  isActive: z.boolean().default(true),
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
  kategori: z.enum(KATEGORI_AKUN_VALUES).optional(),
  normalBalance: z.enum(NORMAL_BALANCE_VALUES).optional(),
  isActive: z.boolean().optional(),
});

export type FilterAkun = z.infer<typeof filterAkunSchema>;
