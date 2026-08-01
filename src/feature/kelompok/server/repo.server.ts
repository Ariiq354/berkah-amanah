import { db } from "#/database";

export const KelompokRepo = {
  async getOptionsKelompok() {
    return await db.query.kelompok.findMany();
  },
};
