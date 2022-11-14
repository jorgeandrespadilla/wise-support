import { useId } from "react";
import { BaseInputProps } from "types/ui";

type InputProps = BaseInputProps & {
    value: string;
    onChange: (value: string) => void;
    children?: React.ReactNode;
};

/**
 * A fully customizable base dropdown component.
 * 
 * If a placeholder is provided, the first option will be a placeholder (not selectable).
 * If no placeholder is provided, the field will be empty.
 */
function Dropdown({
    label,
    value,
    width = "full",
    placeholder = "",
    feedback = "",
    invalid = false,
    disabled = false,
    onChange = () => { },
    children,
}: InputProps) {
    const field = useId();

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const newValue = event.target.value;
        onChange(newValue);
    }

    const emptyValue = value === "";

    return (
        <div className={width === "full" ? "w-full" : "w-72"}>
            {
                label && (
                    <label htmlFor={field} className="block text-sm mb-1 font-medium text-gray-700">
                        {label}
                    </label>
                )
            }
            <div className="relative">
                <select
                    id={field}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    onChange={handleChange}
                    className={`lock border border-gray-300 rounded-md outline-none px-3 py-2 w-full sm:text-sm ${emptyValue ? 'text-gray-500' : ''} ${invalid ? 'border-danger' : ''}`}
                >
                    <>
                        <option value="" disabled hidden>{placeholder}</option>
                        {children}
                    </>
                </select>
            </div>
            {
                feedback && (
                    <label className={`block text-xs mt-0.5 ml-1 font-medium ${invalid ? 'text-danger' : 'text-gray-500'}`}>
                        {feedback}
                    </label>
                )
            }
        </div>
    );
}

export default Dropdown;