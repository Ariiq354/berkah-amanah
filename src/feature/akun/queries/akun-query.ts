import { queryOptions } from "@tanstack/react-query";

import { getAkunListFn } from "../server/fn";
import type { FilterAkunInput } from "../server/model";

export const getAkunListQueryOptions = (query: FilterAkunInput = {}) =>
  queryOptions({
    queryKey: ["akun", query],
    queryFn: () => getAkunListFn({ data: query }),
  });
