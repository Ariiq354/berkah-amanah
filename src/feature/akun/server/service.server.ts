import type { CreateAkun, FilterAkun, UpdateAkun } from "./model";
import { AkunRepo } from "./repo.server";

export abstract class AkunService {
  static async getAkunList(filters: FilterAkun) {
    return await AkunRepo.getAkunList(filters);
  }

  static async getAkunById(id: number) {
    const data = await AkunRepo.getAkunById(id);
    if (!data) {
      throw new Error("Akun tidak ditemukan");
    }
    return data;
  }

  static async createAkun(data: CreateAkun) {
    const existing = await AkunRepo.getAkunByKode(data.kodeAkun);
    if (existing) {
      throw new Error("Kode akun sudah digunakan");
    }
    return await AkunRepo.createAkun(data);
  }

  static async updateAkun(data: UpdateAkun) {
    const { id, ...updateData } = data;

    if (updateData.kodeAkun) {
      const codeTaken = await AkunRepo.getAkunByKode(updateData.kodeAkun);
      if (codeTaken && codeTaken.id !== id) {
        throw new Error("Kode akun sudah digunakan");
      }
    }

    const res = await AkunRepo.updateAkun(id, updateData);
    if (res.length === 0) {
      throw new Error("Akun tidak ditemukan");
    }
  }

  static async deleteAkun(ids: number[]) {
    const res = await AkunRepo.deleteAkun(ids);
    if (res.length === 0) {
      throw new Error("Akun tidak ditemukan");
    }
    return res;
  }
}
