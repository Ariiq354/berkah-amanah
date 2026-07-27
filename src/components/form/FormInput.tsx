import type { ComponentProps } from "react";

import { Input } from "../ui/input";
import { useFieldContext } from "./context";
import { FormBase, type FormControlProps } from "./FormBase";

export type FormInputProps = FormControlProps &
  Omit<
    ComponentProps<typeof Input>,
    "id" | "name" | "value" | "onBlur" | "onChange" | "aria-invalid"
  >;

export function FormInput({ label, description, ...props }: FormInputProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase label={label} description={description}>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        {...props}
      />
    </FormBase>
  );
}
