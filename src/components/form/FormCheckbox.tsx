import type { ComponentProps } from "react";

import { Checkbox } from "../ui/checkbox";
import { useFieldContext } from "./context";
import { FormBase, type FormControlProps } from "./FormBase";

export type FormCheckboxProps = FormControlProps &
  Omit<
    ComponentProps<typeof Checkbox>,
    "id" | "name" | "checked" | "onBlur" | "onCheckedChange" | "aria-invalid"
  >;

export function FormCheckbox({
  label,
  description,
  ...props
}: FormCheckboxProps) {
  const field = useFieldContext<boolean>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase label={label} description={description} controlFirst horizontal>
      <Checkbox
        id={field.name}
        name={field.name}
        checked={field.state.value}
        onBlur={field.handleBlur}
        onCheckedChange={(e) => field.handleChange(e === true)}
        aria-invalid={isInvalid}
        {...props}
      />
    </FormBase>
  );
}
