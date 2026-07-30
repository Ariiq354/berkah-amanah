import { and, desc, eq, ilike, inArray, or, type SQL } from "drizzle-orm";

import { db } from "#/database";
import { akun } from "#/database/schema";

import type { CreateAkun, FilterAkun } from "./model";

export abstract class AkunRepo {
  static async getAkunList(query: FilterAkun) {
    const conditions: (SQL<unknown> | undefined)[] = [];

    if (query.search) {
      conditions.push(
        or(
          ilike(akun.namaAkun, `%${query.search}%`),
          ilike(akun.kodeAkun, `%${query.search}%`),
        ),
      );
    }

    const qb = db
      .select({
        id: akun.id,
        kodeAkun: akun.kodeAkun,
        namaAkun: akun.namaAkun,
        status: akun.status,
      })
      .from(akun)
      .where(and(...conditions))
      .orderBy(desc(akun.id));

    const offset = (query.page - 1) * query.limit;
    const total = await db.$count(qb);
    const data = await qb.limit(query.limit).offset(offset);

    return { total, data };
  }

  static async getAkunById(id: number) {
    return await db.query.akun.findFirst({
      where: {
        id,
      },
    });
  }

  static async getAkunByKode(kodeAkun: string) {
    return await db.query.akun.findFirst({
      where: {
        kodeAkun,
      },
    });
  }

  static async createAkun(data: CreateAkun) {
    await db.insert(akun).values(data);
  }

  static async updateAkun(id: number, data: Partial<CreateAkun>) {
    return await db
      .update(akun)
      .set(data)
      .where(eq(akun.id, id))
      .returning({ id: akun.id });
  }

  static async deleteAkun(ids: number[]) {
    return await db
      .delete(akun)
      .where(inArray(akun.id, ids))
      .returning({ id: akun.id });
  }
}
