import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

import { useAppForm } from "#/components/form/hooks";
import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "#/components/ui/field";
import { SelectGroup, SelectItem, SelectLabel } from "#/components/ui/select";
import { Spinner } from "#/components/ui/spinner";
import { getOptionsKelompokQueryOptions } from "#/feature/kelompok/queries/kelompok-query";

import { useRegisterMutation } from "../queries/mutation";
import {
  registerSchema,
  type RegisterSchema,
} from "../schemas/register-schema";

export function RegisterContainer() {
  const registerMutation = useRegisterMutation();

  const { data: kelompok = [], isLoading: isLoadingKelompok } = useQuery(
    getOptionsKelompokQueryOptions,
  );

  const form = useAppForm({
    defaultValues: {
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
      idKelompok: undefined,
    } satisfies RegisterSchema as RegisterSchema,
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value }) => {
      await registerMutation.mutateAsync(value);
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="p-6 md:p-8"
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <img
                  src="/logo.webp"
                  alt="Logo Berkah Amanah"
                  className="mb-2 h-20 w-20 object-contain"
                />
                <h1 className="text-2xl font-bold">Daftar Akun</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Bergabung bersama Berkah Amanah
                </p>
              </div>
              <form.AppField name="name">
                {(field) => (
                  <field.Input
                    label="Nama Lengkap"
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                )}
              </form.AppField>
              <form.AppField name="username">
                {(field) => (
                  <field.Input
                    label="Username"
                    placeholder="Masukkan username"
                    required
                  />
                )}
              </form.AppField>
              <form.AppField name="password">
                {(field) => (
                  <field.InputPassword
                    label="Password"
                    placeholder="Masukkan password"
                    required
                  />
                )}
              </form.AppField>
              <form.AppField name="confirmPassword">
                {(field) => (
                  <field.InputPassword
                    label="Konfirmasi Password"
                    placeholder="Masukkan konfirmasi password"
                    required
                  />
                )}
              </form.AppField>
              <form.AppField name="idKelompok">
                {(field) => (
                  <field.Select
                    label="Kelompok"
                    placeholder={
                      isLoadingKelompok ? "Loading..." : "Pilih Kelompok"
                    }
                    items={kelompok}
                    disabled={isLoadingKelompok}
                  >
                    <SelectGroup>
                      <SelectLabel>Kelompok</SelectLabel>
                      {kelompok.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </field.Select>
                )}
              </form.AppField>
              <Field>
                <Button
                  type="submit"
                  disabled={registerMutation.isPending}
                  aria-disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending && (
                    <Spinner data-icon="inline-start" />
                  )}
                  Buat Akun
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Sudah punya akun? <Link to="/">Masuk</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
