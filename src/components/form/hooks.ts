import { createFormHook } from "@tanstack/react-form";

import { fieldContext, formContext, useFieldContext, useFormContext } from "./context";
import { FormCheckbox } from "./FormCheckbox";
import { FormInput } from "./FormInput";
import { FormNumber } from "./FormNumber";
import { FormPassword } from "./FormPassword";
import { FormSelect } from "./FormSelect";
import { FormTextarea } from "./FormTextarea";

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input: FormInput,
    Checkbox: FormCheckbox,
    Select: FormSelect,
    Textarea: FormTextarea,
    Password: FormPassword,
    Number: FormNumber,
  },
  formComponents: {},
  fieldContext,
  formContext,
});

export { useAppForm, useFieldContext, useFormContext };
