import { useId } from "react";
import { BaseInputProps } from "types/ui";

type TextAreaProps = BaseInputProps & {
    rows?: number;
    value: string;
    onChange: (value: string) => void;
};

function TextArea({
    label,
    value,
    width = "full",
    placeholder = "",
    feedback = "",
    rows = 5,
    invalid = false,
    disabled = false,
    onChange = () => { },
}: TextAreaProps) {
    const field = useId();

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
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
                <textarea
                    id={field}
                    value={value}
                    placeholder={placeholder}
                    rows={rows}
                    disabled={disabled}
                    onChange={handleChange}
                    className={`lock border border-gray-300 rounded-md outline-none px-3 py-2 w-full sm:text-sm ${invalid ? 'border-danger' : ''}`}
                />
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

export default TextArea;