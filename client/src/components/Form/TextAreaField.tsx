import { Controller, FieldValues } from 'react-hook-form';
import { BaseTextAreaType, FormInputProps } from 'types';
import TextArea from 'components/TextArea';

type TextAreaFieldProps<
    TFields extends FieldValues,
    TValue,
> = FormInputProps<TFields> & {
    type?: BaseTextAreaType;
    /**
     * Minimum number of rows to display. If the type is not "text", this will be ignored.
     */
    rows?: number;
    /**
     * Callback to transform the value before it is passed to the input
     */
    valueCallback?: (value: TValue) => string;
    /**
     * Callback to transform the value before it is passed to the form handler
     */
    onChangeCallback?: (value: string) => TValue;
};

/**
 *  A wrapper for the Input component with support for react-hook-form
 */
function TextAreaField<TFields extends FieldValues, TValue = string>({
    name,
    control,
    rules,
    valueCallback,
    onChangeCallback,
    ...props
}: TextAreaFieldProps<TFields, TValue>) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
                <TextArea
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

export default TextAreaField;
