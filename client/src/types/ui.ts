import { ReactNode } from 'react';
import { Path, FieldValues, RegisterOptions, Control } from 'react-hook-form';

export type ColorScheme = "light" | "dark";
export type Theme = ColorScheme | "system";

export interface LinkConfig {
    /** The URL of the link */
    to: string;
    /** The text to show in the link */
    label: string;
    /** The icon to display next to the link */
    icon?: ReactNode;
    /** The allowed roles to see the link */
    roles: string[];
};

export interface DropdownOption {
    /** The value of the option */
    value: string;
    /** The text to show in the dropdown */
    label: string;
}

export interface DropdownMenuOption {
    /** The text to show in the dropdown */
    label: string;
    /** The icon to display next to the option */
    icon?: ReactNode;
    /** 
     * The action to perform when the option is clicked.
     * If this is set, the option will act as a button.
     */
    action?: () => void;
    /** 
     * The URL to navigate to when the option is clicked.
     * If this is set, the action will not be called, and the option will act as a link.
     */
    navigateTo?: string;
}

//#region Inputs

export type BaseInputType = "text" | "password" | "date" | "email" | "url";

export type BaseTextAreaType = "text" | "markdown";

export type InputMode = "text" | "numeric" | "decimal";

export type DateFormat = "default" | "iso";

export type BaseInputProps = {
    /** The label to show above the input */
    label?: string;
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
};

export type InputDecorationProps = {
    prefixContent?: ReactNode;
    clickablePrefix?: boolean;
    suffixContent?: ReactNode;
    clickableSuffix?: boolean;
};

export type BaseFormInputProps<TFormValues extends FieldValues = FieldValues> = {
    name: Path<TFormValues>;
    control?: Control<TFormValues>;
    rules?: RegisterOptions;
};

export type FormInputProps<TFields extends FieldValues> = BaseInputProps & BaseFormInputProps<TFields>;

//#endregion