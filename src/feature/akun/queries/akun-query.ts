import { keepPreviousData, queryOptions } from "@tanstack/react-query";

import { getAkunListFn } from "../server/fn";
import type { FilterAkun } from "../server/model";

export const getAkunListQueryOptions = (query: FilterAkun) =>
  queryOptions({
    queryKey: ["akun", query],
    queryFn: () => getAkunListFn({ data: query }),
    placeholderData: keepPreviousData,
  });
