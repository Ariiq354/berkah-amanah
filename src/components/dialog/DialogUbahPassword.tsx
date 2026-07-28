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
import { useChangePasswordMutation } from "#/feature/auth/mutations/change-password-mutation";
import {
  changePasswordSchema,
  type ChangePasswordSchema,
} from "#/feature/auth/schemas/change-password-schema";

interface DialogUbahPasswordProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DialogUbahPassword({
  open,
  onOpenChange,
}: DialogUbahPasswordProps) {
  const changePasswordMutation = useChangePasswordMutation();

  const form = useAppForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    } satisfies ChangePasswordSchema as ChangePasswordSchema,
    validators: {
      onSubmit: changePasswordSchema,
    },
    onSubmit: async ({ value }) => {
      await changePasswordMutation.mutateAsync(value);
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
            <DialogTitle>Ubah Password</DialogTitle>
            <DialogDescription>
              Masukkan password lama Anda dan tentukan password baru yang ingin
              Anda gunakan.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-4">
            <form.AppField name="currentPassword">
              {(field) => (
                <field.InputPassword
                  label="Password Lama"
                  placeholder="Masukkan password lama"
                  required
                />
              )}
            </form.AppField>
            <form.AppField name="newPassword">
              {(field) => (
                <field.InputPassword
                  label="Password Baru"
                  placeholder="Masukkan password baru"
                  required
                />
              )}
            </form.AppField>
            <form.AppField name="confirmPassword">
              {(field) => (
                <field.InputPassword
                  label="Konfirmasi Password Baru"
                  placeholder="Ulangi password baru"
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={changePasswordMutation.isPending}
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={changePasswordMutation.isPending}
              aria-disabled={changePasswordMutation.isPending}
            >
              {changePasswordMutation.isPending && (
                <Spinner data-icon="inline-start" />
              )}
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
