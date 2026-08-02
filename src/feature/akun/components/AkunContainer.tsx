import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";

import { InputSearch } from "#/components/input/InputSearch";
import { DataTable } from "#/components/table/DataTable";
import { Button } from "#/components/ui/button";

import { useDeleteAkunMutation } from "../mutations/delete-mutation";
import { getAkunListQueryOptions } from "../queries/akun-query";
import type { FilterAkun } from "../server/model";
import { akunColumns, type AkunRow } from "./columns";
import { DialogTambahAkun } from "./DialogTambahAkun";

export function AkunContainer() {
  const [query, setQuery] = useState<FilterAkun>({
    page: 1,
    limit: 10,
  });
  const { data, isLoading } = useQuery(getAkunListQueryOptions(query));

  // --- Edit ---
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAkun, setSelectedAkun] = useState<AkunRow | null>(null);

  function handleEditDialogOpenChange(open: boolean) {
    setIsDialogOpen(open);
    if (!open) setSelectedAkun(null);
  }

  // --- Delete ---
  const deleteAkunMutation = useDeleteAkunMutation();

  // --- Columns ---
  function handleEdit(akun: AkunRow) {
    setSelectedAkun(akun);
    setIsDialogOpen(true);
  }

  function handleTambahClick() {
    setSelectedAkun(null);
    setIsDialogOpen(true);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <InputSearch
          onSearch={(search) =>
            setQuery((current) => ({
              ...current,
              search: search || undefined,
              page: 1,
            }))
          }
        />
        <Button onClick={handleTambahClick}>
          <Plus className="size-4" />
          Tambah Data
        </Button>
      </div>

      <DataTable
        data={data?.data ?? []}
        columns={akunColumns}
        rowCount={data?.total ?? 0}
        pageIndex={query.page - 1}
        pageSize={query.limit}
        isLoading={isLoading}
        onPaginationChange={(pageIndex, pageSize) =>
          setQuery((current) => ({
            ...current,
            page: pageIndex + 1,
            limit: pageSize,
          }))
        }
        onEdit={handleEdit}
        selectable
        deleteConfig={{
          itemName: "Akun",
          onConfirm: async (rows) => {
            await deleteAkunMutation.mutateAsync(rows.map((row) => row.id));
          },
          isPending: deleteAkunMutation.isPending,
        }}
      />

      <DialogTambahAkun
        akun={selectedAkun}
        open={isDialogOpen}
        onOpenChange={handleEditDialogOpenChange}
      />
    </div>
  );
}
