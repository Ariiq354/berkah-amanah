import { queryOptions } from "@tanstack/react-query";

import { getAkunByIdFn } from "../server/fn";

export const getAkunByIdQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ["akun", id],
    queryFn: () => getAkunByIdFn({ data: id }),
  });
