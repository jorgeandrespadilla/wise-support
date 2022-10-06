import { ReactNode, useId } from "react";

type InputProps = {
    label?: string;
    value: string;
    placeholder?: string;
    type?: "text" | "password" | "date";
    prefixIcon?: ReactNode;
    onChange?: (value: string) => void;
};

function Input({
    label,
    value,
    placeholder = "",
    type = "text",
    prefixIcon,
    onChange = () => { },
}: InputProps) {
    const field = useId();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newValue = event.target.value;
        onChange(newValue);
    }

    return (
        <div className="w-80">
            {
                label && (
                    <label htmlFor={field} className="block text-sm mb-1 font-medium text-gray-700">
                        {label}
                    </label>
                )
            }
            <div className="relative">
                {
                    prefixIcon && (
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">
                                {prefixIcon}
                            </span>
                        </div>
                    )
                }
                <input id={field} type={type} value={value} onChange={handleChange} placeholder={placeholder} className={`lock border border-gray-300 rounded-md outline-none px-3 py-2 w-full sm:text-sm ${prefixIcon ? 'pl-10' : ''}`} />
            </div>
        </div>
    );
}

export default Input;