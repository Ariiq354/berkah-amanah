import { boolean, integer, snakeCase, text } from "drizzle-orm/pg-core";

export const akun = snakeCase.table("akun", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  kodeAkun: text().notNull().unique(),
  namaAkun: text().notNull(),
  status: boolean().notNull().default(true),
});
