import { Eye, EyeOff } from "lucide-react";
import type { ComponentProps } from "react";
import * as React from "react";

import { cn } from "#/lib/utils";

import { Input } from "../ui/input";
import { useFieldContext } from "./context";
import { FormBase, type FormControlProps } from "./FormBase";

export type FormPasswordProps = FormControlProps &
  Omit<ComponentProps<typeof Input>, "id" | "name" | "value" | "onBlur" | "onChange" | "aria-invalid" | "type">;

export function FormPassword({ label, description, className, ...props }: FormPasswordProps) {
  const field = useFieldContext<string>();
  const [showPassword, setShowPassword] = React.useState(false);
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <FormBase label={label} description={description}>
      <div className="relative flex w-full items-center">
        <Input
          id={field.name}
          name={field.name}
          type={showPassword ? "text" : "password"}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          className={cn("pr-10", className)}
          {...props}
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="text-muted-foreground hover:text-foreground absolute right-3 flex cursor-pointer items-center justify-center rounded-md p-1 select-none focus:outline-none"
          aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </FormBase>
  );
}

export { FormPassword as InputPassword };
