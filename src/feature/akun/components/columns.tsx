import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "#/components/ui/badge";

import type { getAkunListFn } from "../server/fn";

export type AkunRow = Awaited<ReturnType<typeof getAkunListFn>>["data"][number];

export const akunColumns: ColumnDef<AkunRow>[] = [
  {
    accessorKey: "kodeAkun",
    header: "Kode Akun",
  },
  {
    accessorKey: "namaAkun",
    header: "Nama Akun",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as boolean;
      return (
        <Badge variant={status ? "default" : "secondary"}>
          {status ? "Aktif" : "Non-Aktif"}
        </Badge>
      );
    },
  },
];
