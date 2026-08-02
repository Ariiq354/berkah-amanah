import { boolean, integer, pgEnum, snakeCase, text } from "drizzle-orm/pg-core";

export const kategoriAkunEnum = pgEnum("kategori_akun", [
  "Aktiva",
  "Pasiva",
  "Pendapatan",
  "Biaya",
]);

export const normalBalanceEnum = pgEnum("normal_balance", ["Debit", "Kredit"]);

export const akun = snakeCase.table("akun", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  kodeAkun: text().notNull().unique(),
  namaAkun: text().notNull(),
  kategori: kategoriAkunEnum(),
  normalBalance: normalBalanceEnum(),
  isActive: boolean().notNull().default(true),
});
