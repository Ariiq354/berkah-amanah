import { EyeIcon, EyeOffIcon } from "lucide-react";
import type { ComponentProps } from "react";
import * as React from "react";

import { Input } from "../ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { useFieldContext } from "./context";
import { FormBase, type FormControlProps } from "./FormBase";

export type FormPasswordProps = FormControlProps &
  Omit<
    ComponentProps<typeof Input>,
    "id" | "name" | "value" | "onBlur" | "onChange" | "aria-invalid" | "type"
  >;

export function FormInputPassword({
  label,
  description,
  ...props
}: FormPasswordProps) {
  const field = useFieldContext<string>();
  const [showPassword, setShowPassword] = React.useState(false);
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const Icon = showPassword ? EyeOffIcon : EyeIcon;

  return (
    <FormBase label={label} description={description}>
      <InputGroup>
        <InputGroupInput
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          type={showPassword ? "text" : "password"}
          aria-invalid={isInvalid}
          {...props}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            type="button"
            size="icon-xs"
            onClick={() => setShowPassword((p) => !p)}
          >
            <Icon className="size-4.5" />
            <span className="sr-only">
              {showPassword ? "Hide password" : "Show password"}
            </span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </FormBase>
  );
}
