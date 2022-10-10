import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import IconButton from "components/IconButton";
import FormField from "./FormField";
import { FormInputProps } from "types/ui";

type PasswordFieldProps<TFields extends FieldValues> = FormInputProps<TFields> & {
    togglePassword?: boolean;
};

function PasswordField<TFields extends FieldValues>({
    togglePassword = false,
    ...props
}: PasswordFieldProps<TFields>) {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <FormField
            type={showPassword ? 'text' : 'password'}
            suffixContent={
                togglePassword && (
                    <IconButton type="minimal" onClick={() => setShowPassword(!showPassword)} icon={
                        showPassword 
                            ? <EyeIcon className="h-5 w-5 text-gray-500" />
                            : <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                    } />
                )
            }
            clickableSuffix
            {...props}
        />
    );
}

export default PasswordField;