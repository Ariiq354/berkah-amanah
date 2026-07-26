import type { ComponentProps } from "react";

import { Textarea } from "../ui/textarea";
import { useFieldContext } from "./context";
import { FormBase, type FormControlProps } from "./FormBase";

export type FormTextareaProps = FormControlProps &
  Omit<ComponentProps<typeof Textarea>, "id" | "name" | "value" | "onBlur" | "onChange" | "aria-invalid">;

export function FormTextarea({ label, description, ...props }: FormTextareaProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase label={label} description={description}>
      <Textarea
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
