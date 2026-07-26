import type { ComponentProps } from "react";
import * as React from "react";

import { Input } from "../ui/input";
import { useFieldContext } from "./context";
import { FormBase, type FormControlProps } from "./FormBase";

export type FormNumberProps = FormControlProps &
  Omit<ComponentProps<typeof Input>, "id" | "name" | "value" | "onBlur" | "onChange" | "aria-invalid" | "type">;

export function FormNumber({ label, description, ...props }: FormNumberProps) {
  const field = useFieldContext<number>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  // Local string state to handle typing decimals (e.g., '12.') or temporary values smoothly
  const [prevFieldValue, setPrevFieldValue] = React.useState<number | null | undefined>(field.state.value);
  const [inputValue, setInputValue] = React.useState<string>(
    field.state.value !== undefined && field.state.value !== null ? String(field.state.value) : "",
  );

  // Synchronize local input state if form value changes externally
  if (field.state.value !== prevFieldValue) {
    setPrevFieldValue(field.state.value);
    setInputValue(field.state.value !== undefined && field.state.value !== null ? String(field.state.value) : "");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    if (val === "") {
      field.handleChange(undefined as any);
      return;
    }

    const num = Number(val);
    if (!isNaN(num)) {
      field.handleChange(num);
    }
  };

  return (
    <FormBase label={label} description={description}>
      <Input
        id={field.name}
        name={field.name}
        type="number"
        value={inputValue}
        onBlur={field.handleBlur}
        onChange={handleChange}
        aria-invalid={isInvalid}
        {...props}
      />
    </FormBase>
  );
}

export { FormNumber as InputNumber };
