import { createFormHook } from "@tanstack/react-form";

import {
  fieldContext,
  formContext,
  useFieldContext,
  useFormContext,
} from "./context";
import { FormCheckbox } from "./FormCheckbox";
import { FormInput } from "./FormInput";
import { FormInputNumber } from "./FormInputNumber";
import { FormInputPassword } from "./FormInputPassword";
import { FormSelect } from "./FormSelect";
import { FormTextarea } from "./FormTextarea";

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input: FormInput,
    Checkbox: FormCheckbox,
    Select: FormSelect,
    Textarea: FormTextarea,
    InputPassword: FormInputPassword,
    InputNumber: FormInputNumber,
  },
  formComponents: {},
  fieldContext,
  formContext,
});

export { useAppForm, useFieldContext, useFormContext };
