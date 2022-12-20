import { Controller, FieldValues } from 'react-hook-form';
import Input from 'components/Input';
import {
    BaseInputType,
    FormInputProps,
    InputDecorationProps,
    InputMode,
} from 'types';

type FormFieldProps<
    TFields extends FieldValues,
    TValue,
> = FormInputProps<TFields> &
    InputDecorationProps & {
        type?: BaseInputType;
        inputMode?: InputMode;
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
function FormField<TFields extends FieldValues, TValue = string>({
    name,
    control,
    rules,
    valueCallback,
    onChangeCallback,
    ...props
}: FormFieldProps<TFields, TValue>) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
                <Input
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

export default FormField;
