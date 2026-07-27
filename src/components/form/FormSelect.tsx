import type { ComponentProps, ReactNode } from "react";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useFieldContext } from "./context";
import { FormBase, type FormControlProps } from "./FormBase";

export type FormSelectProps = FormControlProps & {
  children: ReactNode;
  placeholder?: string;
} & Omit<ComponentProps<typeof Select>, "value" | "onValueChange">;

export function FormSelect({
  children,
  label,
  description,
  ...props
}: FormSelectProps) {
  const field = useFieldContext<string | number>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase label={label} description={description}>
      <Select
        onValueChange={(e: any) => field.handleChange(e)}
        value={field.state.value}
        {...props}
      >
        <SelectTrigger
          aria-invalid={isInvalid}
          id={field.name}
          onBlur={field.handleBlur}
        >
          <SelectValue placeholder={props.placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </FormBase>
  );
}
