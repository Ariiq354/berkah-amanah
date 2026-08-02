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
    accessorKey: "kategori",
    header: "Kategori",
    cell: ({ row }) => {
      const kategori = row.original.kategori;
      return kategori ? <Badge variant="outline">{kategori}</Badge> : "-";
    },
  },
  {
    accessorKey: "normalBalance",
    header: "Normal Balance",
    cell: ({ row }) => {
      const normalBalance = row.original.normalBalance;
      return normalBalance ? (
        <Badge variant="outline">{normalBalance}</Badge>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.original.isActive;
      return (
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Aktif" : "Non-Aktif"}
        </Badge>
      );
    },
  },
];
