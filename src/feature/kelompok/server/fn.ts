import { createServerFn } from "@tanstack/react-start";

import { KelompokService } from "./service.server";

export const getOptionsKelompokFn = createServerFn({ method: "GET" }).handler(
  () => KelompokService.getOptionsKelompok(),
);
