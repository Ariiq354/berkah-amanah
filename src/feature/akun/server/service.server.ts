import { errAsync, ok } from "neverthrow";

import { AkunErrors } from "./errors";
import type { CreateAkun, FilterAkun, UpdateAkun } from "./model";
import { AkunRepo } from "./repo.server";

export abstract class AkunService {
  static getAkunList(filters: FilterAkun) {
    return AkunRepo.getAkunList(filters);
  }

  static createAkun(data: CreateAkun) {
    return AkunRepo.getAkunByKode(data.kodeAkun).andThen((existing) => {
      if (existing) {
        return errAsync(AkunErrors.kodeUsed());
      }

      return AkunRepo.createAkun(data);
    });
  }

  static updateAkun(data: UpdateAkun) {
    const { id, ...updateData } = data;

    const updateAndCheck = () =>
      AkunRepo.updateAkun(id, updateData).andThen((res) => {
        if (res.length === 0) {
          return errAsync(AkunErrors.notFound());
        }
        return ok(undefined);
      });

    if (!updateData.kodeAkun) {
      return updateAndCheck();
    }

    return AkunRepo.getAkunByKode(updateData.kodeAkun).andThen((existing) => {
      if (existing && existing.id !== id) {
        return errAsync(AkunErrors.kodeUsed());
      }

      return updateAndCheck();
    });
  }

  static deleteAkun(ids: number[]) {
    return AkunRepo.deleteAkun(ids).andThen((res) => {
      if (res.length === 0) {
        return errAsync(AkunErrors.notFound());
      }
      return ok(undefined);
    });
  }
}
