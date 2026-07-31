import { and, desc, eq, ilike, inArray, or, type SQL } from "drizzle-orm";
import { ResultAsync } from "neverthrow";

import { db } from "#/database";
import { akun } from "#/database/schema";

import { AkunErrors } from "./errors";
import type { CreateAkun, FilterAkun } from "./model";

export abstract class AkunRepo {
  static getAkunList(query: FilterAkun) {
    return ResultAsync.fromPromise(
      (async () => {
        const conditions: (SQL<unknown> | undefined)[] = [];

        if (query.search) {
          conditions.push(
            or(
              ilike(akun.namaAkun, `%${query.search}%`),
              ilike(akun.kodeAkun, `%${query.search}%`),
            ),
          );
        }

        if (query.status) {
          conditions.push(eq(akun.status, query.status));
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
      })(),
      AkunErrors.database,
    );
  }

  static getAkunById(id: number) {
    return ResultAsync.fromPromise(
      db.query.akun.findFirst({ where: { id } }),
      AkunErrors.database,
    );
  }

  static getAkunByKode(kodeAkun: string) {
    return ResultAsync.fromPromise(
      db.query.akun.findFirst({ where: { kodeAkun } }),
      AkunErrors.database,
    );
  }

  static createAkun(data: CreateAkun) {
    return ResultAsync.fromPromise(
      db.insert(akun).values(data),
      AkunErrors.database,
    );
  }

  static updateAkun(id: number, data: Partial<CreateAkun>) {
    return ResultAsync.fromPromise(
      db
        .update(akun)
        .set(data)
        .where(eq(akun.id, id))
        .returning({ id: akun.id }),
      AkunErrors.database,
    );
  }

  static deleteAkun(ids: number[]) {
    return ResultAsync.fromPromise(
      db.delete(akun).where(inArray(akun.id, ids)).returning({ id: akun.id }),
      AkunErrors.database,
    );
  }
}
