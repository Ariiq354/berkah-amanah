import { createServerFn } from "@tanstack/react-start";

import { ensureSession } from "#/lib/auth-function";
import { deleteSchema } from "#/lib/schema";

import { createAkunSchema, filterAkunSchema, updateAkunSchema } from "./model";
import { AkunService } from "./service.server";

export const getAkunListFn = createServerFn({ method: "GET" })
  .validator(filterAkunSchema)
  .handler(async ({ data: filters }) => {
    await ensureSession();

    const res = await AkunService.getAkunList(filters);

    return res.match(
      (data) => data,
      () => {
        throw new Error("Terjadi kesalahan database");
      },
    );
  });

export const createAkunFn = createServerFn({ method: "POST" })
  .validator(createAkunSchema)
  .handler(async ({ data }) => {
    await ensureSession();

    const res = await AkunService.createAkun(data);
    return res.match(
      () => {},
      (error) => {
        switch (error.code) {
          case "KODE_USED":
            throw new Error("Kode akun sudah digunakan");
          case "DATABASE_ERROR":
            throw new Error("Terjadi kesalahan database");
          default:
            error satisfies never;
            throw new Error(`Terjadi kesalahan`);
        }
      },
    );
  });

export const updateAkunFn = createServerFn({ method: "POST" })
  .validator(updateAkunSchema)
  .handler(async ({ data }) => {
    await ensureSession();

    const res = await AkunService.updateAkun(data);

    return res.match(
      () => {},
      (error) => {
        switch (error.code) {
          case "KODE_USED":
            throw new Error("Kode akun sudah digunakan");
          case "AKUN_NOT_FOUND":
            throw new Error("Akun tidak ditemukan");
          case "DATABASE_ERROR":
            throw new Error("Terjadi kesalahan database");
          default:
            error satisfies never;
            throw new Error("Terjadi kesalahan");
        }
      },
    );
  });

export const deleteAkunFn = createServerFn({ method: "POST" })
  .validator(deleteSchema)
  .handler(async ({ data: ids }) => {
    await ensureSession();

    const res = await AkunService.deleteAkun(ids);
    return res.match(
      () => {},
      (error) => {
        switch (error.code) {
          case "AKUN_NOT_FOUND":
            throw new Error("Akun tidak ditemukan");
          case "DATABASE_ERROR":
            throw new Error("Terjadi kesalahan database");
          default:
            error satisfies never;
            throw new Error("Terjadi kesalahan");
        }
      },
    );
  });
