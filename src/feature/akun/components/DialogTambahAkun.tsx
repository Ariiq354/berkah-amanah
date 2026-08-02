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
import { SelectGroup, SelectItem, SelectLabel } from "#/components/ui/select";
import { Spinner } from "#/components/ui/spinner";

import { useCreateAkunMutation } from "../mutations/create-mutation";
import { useUpdateAkunMutation } from "../mutations/update-mutation";
import {
  createAkunSchema,
  KATEGORI_AKUN_VALUES,
  NORMAL_BALANCE_VALUES,
  type CreateAkunInput,
} from "../server/model";
import type { AkunRow } from "./columns";

interface DialogTambahAkunProps {
  akun?: AkunRow | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function getAkunFormValues(akun: AkunRow | null): CreateAkunInput {
  if (akun) {
    return {
      kodeAkun: akun.kodeAkun,
      namaAkun: akun.namaAkun,
      kategori: akun.kategori,
      normalBalance: akun.normalBalance,
      isActive: akun.isActive,
    };
  }

  return {
    kodeAkun: "",
    namaAkun: "",
    kategori: null,
    normalBalance: null,
    isActive: true,
  };
}

export function DialogTambahAkun({
  akun = null,
  open,
  onOpenChange,
}: DialogTambahAkunProps) {
  const createAkunMutation = useCreateAkunMutation();
  const updateAkunMutation = useUpdateAkunMutation();
  const isEditing = akun !== null;

  const form = useAppForm({
    defaultValues: getAkunFormValues(akun),
    validators: {
      onSubmit: createAkunSchema,
    },
    onSubmit: async ({ value }) => {
      if (akun) {
        await updateAkunMutation.mutateAsync({ id: akun.id, ...value });
      } else {
        await createAkunMutation.mutateAsync(value);
      }

      onOpenChange(false);
    },
  });

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      form.reset(getAkunFormValues(akun));
    } else {
      form.reset(getAkunFormValues(null));
    }
    onOpenChange(nextOpen);
  }

  const isPending =
    createAkunMutation.isPending || updateAkunMutation.isPending;

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
            <DialogTitle>{isEditing ? "Edit Akun" : "Tambah Akun"}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Perbarui data akun di bawah ini."
                : "Isi formulir di bawah ini untuk menambahkan akun baru."}
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

            <form.AppField
              name="kategori"
              listeners={{
                onChange: ({ value }) => {
                  if (value === "Aktiva" || value === "Biaya") {
                    form.setFieldValue("normalBalance", "Debit");
                  } else if (value === "Pasiva" || value === "Pendapatan") {
                    form.setFieldValue("normalBalance", "Kredit");
                  }
                },
              }}
            >
              {(field) => (
                <field.Select
                  label="Kategori"
                  placeholder="Pilih Kategori"
                  items={KATEGORI_AKUN_VALUES.map((val) => ({
                    value: val,
                    label: val,
                  }))}
                >
                  <SelectGroup>
                    <SelectLabel>Kategori Akun</SelectLabel>
                    {KATEGORI_AKUN_VALUES.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </field.Select>
              )}
            </form.AppField>

            <form.AppField name="normalBalance">
              {(field) => (
                <field.Select
                  label="Normal Balance"
                  placeholder="Pilih Normal Balance"
                  items={NORMAL_BALANCE_VALUES.map((val) => ({
                    value: val,
                    label: val,
                  }))}
                >
                  <SelectGroup>
                    <SelectLabel>Normal Balance</SelectLabel>
                    {NORMAL_BALANCE_VALUES.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </field.Select>
              )}
            </form.AppField>

            <form.AppField name="isActive">
              {(field) => <field.Checkbox label="Status Aktif" />}
            </form.AppField>
          </FieldGroup>

          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => handleOpenChange(false)}
              disabled={isPending}
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              aria-disabled={isPending}
            >
              {isPending && <Spinner data-icon="inline-start" />}
              {isEditing ? "Simpan Perubahan" : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
