import { KelompokRepo } from "./repo.server";

export const KelompokService = {
  async getOptionsKelompok() {
    const kelompok = await KelompokRepo.getOptionsKelompok();

    const data = kelompok.map((item) => ({
      label: item.namaKelompok,
      value: item.id,
    }));

    return data;
  },
};
