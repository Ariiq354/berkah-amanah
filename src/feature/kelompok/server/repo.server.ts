import { db } from "#/database";

export abstract class KelompokRepo {
  static async getOptionsKelompok() {
    return await db.query.kelompok.findMany();
  }
}
