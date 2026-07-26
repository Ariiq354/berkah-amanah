import type { ComponentProps } from "react";

import { Input } from "../ui/input";
import { useFieldContext } from "./context";
import { FormBase, type FormControlProps } from "./FormBase";

export type FormInputProps = FormControlProps &
  Omit<
    ComponentProps<typeof Input>,
    "id" | "name" | "value" | "onBlur" | "onChange" | "aria-invalid"
  >;

export function FormInputNumber({
  label,
  description,
  ...props
}: FormInputProps) {
  const field = useFieldContext<number | null>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase label={label} description={description}>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value ?? ""}
        onBlur={field.handleBlur}
        type="number"
        onChange={(e) => {
          const number = e.target.valueAsNumber;
          field.handleChange(Number.isNaN(number) ? null : number);
        }}
        aria-invalid={isInvalid}
        {...props}
      />
    </FormBase>
  );
}
