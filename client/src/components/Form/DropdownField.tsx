import { Controller, FieldValues } from 'react-hook-form';
import { FormInputProps } from 'types';
import Dropdown from 'components/Dropdown';

type DropdownFieldProps<
    TFields extends FieldValues,
    TValue,
> = FormInputProps<TFields> & {
    /**
     * Callback to transform the value before it is passed to the dropdown.
     */
    valueCallback?: (value: TValue) => string;
    /**
     * Callback to transform the value before it is passed to the form handler
     */
    onChangeCallback?: (value: string) => TValue;
    /**
     * The options to display in the dropdown.
     */
    children: React.ReactNode;
};

/**
 *  A wrapper for the Dropdown component with support for react-hook-form
 */
function DropdownField<TFields extends FieldValues, TValue = string>({
    name,
    control,
    rules,
    valueCallback,
    onChangeCallback,
    ...props
}: DropdownFieldProps<TFields, TValue>) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
                <Dropdown
                    value={valueCallback ? valueCallback(value) : value}
                    onChange={
                        onChangeCallback
                            ? value => onChange(onChangeCallback(value))
                            : onChange
                    }
                    invalid={Boolean(error)}
                    feedback={error?.message}
                    {...props}
                />
            )}
        />
    );
}

export default DropdownField;
