import { useAppForm } from "#/components/form/hooks";
import { Button } from "#/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "#/components/ui/dialog";
import { FieldGroup } from "#/components/ui/field";
import { Spinner } from "#/components/ui/spinner";

import { useCreateAkunMutation } from "../mutations/create-mutation";
import { createAkunSchema, type CreateAkunInput } from "../server/model";

interface DialogTambahAkunProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DialogTambahAkun({
  open,
  onOpenChange,
}: DialogTambahAkunProps) {
  const createAkunMutation = useCreateAkunMutation();

  const form = useAppForm({
    defaultValues: {
      kodeAkun: "",
      namaAkun: "",
      status: true,
    } satisfies CreateAkunInput as CreateAkunInput,
    validators: {
      onSubmit: createAkunSchema,
    },
    onSubmit: async ({ value }) => {
      await createAkunMutation.mutateAsync(value);
      onOpenChange(false);
    },
  });

  function handleOpenChange(open: boolean) {
    if (!open) {
      form.reset();
    }
    onOpenChange(open);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <DialogHeader>
            <DialogTitle>Tambah Akun</DialogTitle>
            <DialogDescription>
              Isi formulir di bawah ini untuk menambahkan akun baru.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-4">
            <form.AppField name="kodeAkun">
              {(field) => (
                <field.Input
                  label="Kode Akun"
                  placeholder="Contoh: 1001"
                  required
                />
              )}
            </form.AppField>

            <form.AppField name="namaAkun">
              {(field) => (
                <field.Input
                  label="Nama Akun"
                  placeholder="Contoh: Kas Utama"
                  required
                />
              )}
            </form.AppField>

            <form.AppField name="status">
              {(field) => <field.Checkbox label="Status Aktif" />}
            </form.AppField>
          </FieldGroup>

          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={createAkunMutation.isPending}
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={createAkunMutation.isPending}
              aria-disabled={createAkunMutation.isPending}
            >
              {createAkunMutation.isPending && (
                <Spinner data-icon="inline-start" />
              )}
              Simpan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
