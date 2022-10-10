import { FieldValues } from "react-hook-form";
import FormField from "./FormField";
import { FormInputProps } from "types";

type TextFieldProps<TFields extends FieldValues> = FormInputProps<TFields> & {
    type?: "text" | "email" | "url";
};

function TextField<TFields extends FieldValues>({
    type = "text",
    ...props
}: TextFieldProps<TFields>) {
  return (
    <FormField type={type} {...props} />
  );
}

export default TextField;