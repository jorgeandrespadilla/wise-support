export type BaseInputProps<T = string> = {
    /** The label to show above the input */
    label?: string;
    /** The value of the input */
    value: T;
    /** The placeholder of the input */
    placeholder?: string;
    /** The feedback message to show below the input */
    feedback?: string;
    /** Whether the input is invalid */
    invalid?: boolean;
    /** Whether the input is disabled */
    disabled?: boolean;
    /** The width of the input */
    width?: "full" | "half";
    onChange?: (value: T) => void;
};

export interface LinkConfig {
    /** The URL of the link */
    to: string;
    /** The text to show in the link */
    label: string;
};