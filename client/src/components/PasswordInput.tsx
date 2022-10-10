import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Input from "./Input";
import { BaseInputProps } from "types/ui";
import IconButton from "./IconButton";

type PasswordInputProps = BaseInputProps & {
    togglePassword?: boolean;
};

function PasswordInput({
    togglePassword = false,
    ...props
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <Input
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

export default PasswordInput;