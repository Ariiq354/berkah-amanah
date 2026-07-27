import { Link } from "@tanstack/react-router";

import { useAppForm } from "#/components/form/hooks";
import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "#/components/ui/field";
import { Spinner } from "#/components/ui/spinner";

import { useLoginMutation } from "../queries/mutation";
import { loginSchema, type LoginSchema } from "../schemas/login-schema";

export function LoginContainer() {
  const loginMutation = useLoginMutation();

  const form = useAppForm({
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    } satisfies LoginSchema as LoginSchema,
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      await loginMutation.mutateAsync(value);
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
                <h1 className="text-2xl font-bold">Selamat Datang</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Masuk ke portal Berkah Amanah
                </p>
              </div>
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
              <form.AppField name="rememberMe">
                {(field) => <field.Checkbox label="Ingat saya" />}
              </form.AppField>
              <Field>
                <Button
                  type="submit"
                  disabled={loginMutation.isPending}
                  aria-disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending && (
                    <Spinner data-icon="inline-start" />
                  )}
                  Masuk
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Belum punya akun? <Link to="/register">Daftar</Link>
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
