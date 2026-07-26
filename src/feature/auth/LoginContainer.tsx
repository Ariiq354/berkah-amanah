import { Link } from "@tanstack/react-router";

import { useAppForm } from "#/components/form/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { loginSchema, type LoginSchema } from "./model";

export function LoginContainer() {
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
      console.log(value);
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
                <img src="/logo.webp" alt="Logo Berkah Amanah" className="mb-2 h-20 w-20 object-contain" />
                <h1 className="text-2xl font-bold">Selamat Datang</h1>
                <p className="text-muted-foreground text-sm text-balance">Masuk ke portal Berkah Amanah</p>
              </div>
              <form.AppField name="username">{(field) => <field.Input label="Username" />}</form.AppField>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input id="username" type="text" placeholder="Masukkan username" required />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Kata Sandi</FieldLabel>
                </div>
                <Input id="password" type="password" placeholder="••••••••" required />
              </Field>
              <Field>
                <Button type="submit">Masuk</Button>
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
