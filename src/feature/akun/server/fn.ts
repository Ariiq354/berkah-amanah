import { createServerFn } from "@tanstack/react-start";

import { ensureSession } from "#/lib/auth-function";
import { deleteSchema, idSchema } from "#/lib/schema";

import { createAkunSchema, filterAkunSchema, updateAkunSchema } from "./model";
import { AkunService } from "./service.server";

export const getAkunListFn = createServerFn({ method: "GET" })
  .validator(filterAkunSchema)
  .handler(async ({ data: filters }) => {
    await ensureSession();

    return await AkunService.getAkunList(filters);
  });

export const getAkunByIdFn = createServerFn({ method: "GET" })
  .validator(idSchema)
  .handler(async ({ data: id }) => {
    await ensureSession();

    return await AkunService.getAkunById(id);
  });

export const createAkunFn = createServerFn({ method: "POST" })
  .validator(createAkunSchema)
  .handler(async ({ data }) => {
    await ensureSession();

    await AkunService.createAkun(data);
  });

export const updateAkunFn = createServerFn({ method: "POST" })
  .validator(updateAkunSchema)
  .handler(async ({ data }) => {
    await ensureSession();

    await AkunService.updateAkun(data);
  });

export const deleteAkunFn = createServerFn({ method: "POST" })
  .validator(deleteSchema)
  .handler(async ({ data: ids }) => {
    await ensureSession();

    await AkunService.deleteAkun(ids);
  });
