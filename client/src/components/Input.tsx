import { useId } from "react";
import { BaseInputProps, BaseInputType, InputDecorationProps, InputMode } from "types/ui";

type InputProps = BaseInputProps & InputDecorationProps & {
    type?: BaseInputType;
    inputMode?: InputMode;
    value: string;
    onChange: (value: string) => void;
};

/**
 * A fully customizable base input component that can be used to create other inputs.
 */
function Input({
    label,
    value,
    width = "full",
    placeholder = "",
    feedback = "",
    type = "text",
    inputMode = "text",
    invalid = false,
    disabled = false,
    prefixContent,
    clickablePrefix = false,
    suffixContent,
    clickableSuffix = false,
    onChange = () => { },
}: InputProps) {
    const field = useId();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newValue = event.target.value;
        onChange(newValue);
    }

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
                {
                    prefixContent && (
                        <div className={`${!clickablePrefix ? "pointer-events-none" : ""} absolute inset-y-0 left-0 flex items-center`}>
                            <span className="text-gray-500 sm:text-sm">
                                {prefixContent}
                            </span>
                        </div>
                    )
                }
                <input
                    id={field}
                    type={type}
                    inputMode={inputMode}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    onChange={handleChange}
                    className={`lock border border-gray-300 rounded-md outline-none px-3 py-2 w-full sm:text-sm ${prefixContent ? 'pl-10' : ''} ${suffixContent ? 'pr-10' : ''} ${invalid ? 'border-danger' : ''}`}
                />
                {
                    suffixContent && (
                        <div className={`${!clickableSuffix ? "pointer-events-none" : ""} absolute inset-y-0 right-0 flex items-center`}>
                            <span className="text-gray-500 sm:text-sm">
                                {suffixContent}
                            </span>
                        </div>
                    )
                }
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

export default Input;