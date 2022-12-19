import { useId } from "react";
import { BaseInputProps, BaseTextAreaType } from "types/ui";
import 'quill/dist/quill.snow.css';
import MarkdownEditor from "./MarkdownEditor";

type TextAreaProps = BaseInputProps & {
    type?: BaseTextAreaType;
    rows?: number;
    value: string;
    onChange: (value: string) => void;
};

function TextArea({
    type = "text",
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

    function handleTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const newValue = event.target.value;
        onChange(newValue);
    }

    function handleMarkdownEditorChange(value: string) {
        onChange(value);
    }

    return (
        <div className={width === "full" ? "w-full" : "w-72"}>
            {
                label && (
                    <label htmlFor={field} className="block text-sm mb-1 font-medium text-gray-700 dark:text-gray-200">
                        {label}
                    </label>
                )
            }
            <div className="relative">
                {type === "text"
                    ? <textarea
                        id={field}
                        value={value}
                        placeholder={placeholder}
                        rows={rows}
                        disabled={disabled}
                        onChange={handleTextAreaChange}
                        className={`lock border border-gray-300 dark:text-white dark:border-gray-700 dark:bg-slate-800 rounded-md outline-none px-3 py-2 w-full sm:text-sm ${invalid ? 'border-danger' : ''}`}
                    />
                    : <MarkdownEditor value={value} onChange={handleMarkdownEditorChange} />
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

export default TextArea;