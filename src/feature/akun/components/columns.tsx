import type { ColumnDef } from "@tanstack/react-table";

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
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            status
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {status ? "Aktif" : "Non-Aktif"}
        </span>
      );
    },
  },
];
