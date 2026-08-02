import {
  type ColumnDef,
  type PaginationState,
  type RowSelectionState,
  type Updater,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";

import { DialogHapus } from "../dialog/DialogHapus";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DataTablePagination } from "./DataTablePagination";

export interface DeleteConfig<TData> {
  itemName: string;
  onConfirm: (rows: TData[]) => Promise<void>;
  isPending: boolean;
}

interface DataTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  rowCount: number;
  pageIndex: number;
  pageSize: number;
  onPaginationChange: (pageIndex: number, pageSize: number) => void;
  selectable?: boolean;
  onEdit?: (row: TData) => void;
  deleteConfig?: DeleteConfig<TData>;
  isLoading?: boolean;
}

function createSelectColumn<TData>(): ColumnDef<TData, unknown> {
  return {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          !table.getIsAllPageRowsSelected() && table.getIsSomePageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Pilih semua"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Pilih baris"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  };
}

function createActionsColumn<TData>(
  onEdit?: (row: TData) => void,
  onDelete?: (row: TData) => void,
): ColumnDef<TData, unknown> {
  return {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="ghost" className="h-8 w-8 p-0" />}
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            {onEdit && (
              <DropdownMenuItem onClick={() => onEdit(row.original)}>
                <Pencil className="size-4" />
                Edit
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDelete(row.original)}
              >
                <Trash2 className="size-4" />
                Hapus
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  };
}

export function DataTable<TData, TValue>({
  data,
  columns,
  rowCount,
  pageIndex,
  pageSize,
  onPaginationChange,
  selectable = false,
  onEdit,
  deleteConfig,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTargetRow, setDeleteTargetRow] = useState<TData | null>(null);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);

  function handleDeleteRow(row: TData) {
    setDeleteTargetRow(row);
    setIsDeleteOpen(true);
  }

  function handleDeleteOpenChange(open: boolean) {
    setIsDeleteOpen(open);
    if (!open) setDeleteTargetRow(null);
  }

  async function handleDeleteConfirm() {
    if (deleteTargetRow && deleteConfig) {
      await deleteConfig.onConfirm([deleteTargetRow]);
    }
  }

  async function handleBulkDeleteConfirm() {
    if (!deleteConfig) return;
    const selectedRows = table
      .getSelectedRowModel()
      .rows.map((row) => row.original);
    if (selectedRows.length === 0) return;

    await deleteConfig.onConfirm(selectedRows);
    setRowSelection({});
  }

  const hasActions = onEdit || deleteConfig;
  const allColumns = [
    ...(selectable ? [createSelectColumn<TData>()] : []),
    ...columns,
    ...(hasActions
      ? [
          createActionsColumn(
            onEdit,
            deleteConfig ? handleDeleteRow : undefined,
          ),
        ]
      : []),
  ];

  function handlePaginationChange(updater: Updater<PaginationState>) {
    const next =
      typeof updater === "function"
        ? updater({ pageIndex, pageSize })
        : updater;
    onPaginationChange(next.pageIndex, next.pageSize);
  }

  const table = useReactTable({
    data,
    columns: allColumns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount,
    enableRowSelection: selectable,
    state: {
      pagination: { pageIndex, pageSize },
      rowSelection: selectable ? rowSelection : {},
    },
    onRowSelectionChange: selectable ? setRowSelection : undefined,
    onPaginationChange: handlePaginationChange,
  });

  const selectedCount = Object.keys(rowSelection).length;

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-secondary">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: pageSize }).map((_, rowIndex) => (
                <TableRow key={`skeleton-row-${rowIndex}`}>
                  {allColumns.map((col, colIndex) => {
                    const colId = (col as { id?: string }).id;
                    return (
                      <TableCell key={`skeleton-cell-${colIndex}`}>
                        {colId === "select" ? (
                          <Skeleton className="size-4 rounded" />
                        ) : colId === "actions" ? (
                          <Skeleton className="size-8 rounded-md" />
                        ) : (
                          <Skeleton className="h-5 w-full max-w-[80%]" />
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={allColumns.length}
                  className="text-muted-foreground h-24 text-center"
                >
                  Tidak ada data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />

      {selectedCount > 0 && (
        <div className="bg-background fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-lg border px-4 py-3 shadow-lg">
          <span className="text-muted-foreground text-sm">
            {selectedCount} baris dipilih
          </span>
          {deleteConfig && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setIsBulkDeleteOpen(true)}
            >
              <Trash2 className="size-4" />
              Hapus
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRowSelection({})}
          >
            <X className="size-4" />
            Batal
          </Button>
        </div>
      )}

      {deleteConfig && (
        <>
          <DialogHapus
            itemName={deleteConfig.itemName}
            open={isDeleteOpen}
            onOpenChange={handleDeleteOpenChange}
            onConfirm={handleDeleteConfirm}
            isPending={deleteConfig.isPending}
          />
          <DialogHapus
            itemName={`${selectedCount} ${deleteConfig.itemName}`}
            open={isBulkDeleteOpen}
            onOpenChange={setIsBulkDeleteOpen}
            onConfirm={handleBulkDeleteConfirm}
            isPending={deleteConfig.isPending}
          />
        </>
      )}
    </div>
  );
}
