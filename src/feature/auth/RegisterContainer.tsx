import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function RegisterContainer({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <img src="/logo.webp" alt="Logo Berkah Amanah" className="mb-2 h-20 w-20 object-contain" />
                <h1 className="text-2xl font-bold">Daftar Akun</h1>
                <p className="text-muted-foreground text-sm text-balance">Bergabung bersama Berkah Amanah</p>
              </div>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input id="username" type="text" placeholder="Masukkan username" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Kata Sandi</FieldLabel>
                <Input id="password" type="password" placeholder="••••••••" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-password">Konfirmasi Kata Sandi</FieldLabel>
                <Input id="confirm-password" type="password" placeholder="••••••••" required />
              </Field>
              <Field>
                <Button type="submit">Buat Akun</Button>
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
