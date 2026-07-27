import { queryOptions } from "@tanstack/react-query";

import { getOptionsKelompokFn } from "../server/fn";

export const getOptionsKelompokQueryOptions = queryOptions({
  queryKey: ["kelompok"],
  queryFn: getOptionsKelompokFn,
  staleTime: 1000 * 60 * 60,
});
