import { useQuery } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

import { DataTable } from "#/components/table/DataTable";
import { Button } from "#/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "#/components/ui/input-group";

import { getAkunListQueryOptions } from "../queries/akun-query";
import { columns } from "./columns";
import { DialogTambahAkun } from "./DialogTambahAkun";

export function AkunContainer() {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading } = useQuery(
    getAkunListQueryOptions({
      search,
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
    }),
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <InputGroup className="max-w-xs">
          <InputGroupAddon align="inline-start">
            <Search className="size-4" />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Cari akun..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </InputGroup>
        <div className="flex gap-2 bg-red-50">
          Hello {JSON.stringify(isLoading)}
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="size-4" />
          Tambah Data
        </Button>
      </div>

      <DataTable columns={columns} data={data?.data ?? []} />

      <DialogTambahAkun open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}
