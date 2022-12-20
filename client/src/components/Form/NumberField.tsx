import { FieldValues } from 'react-hook-form';
import FormField from './FormField';
import { FormInputProps } from 'types';

type NumberFieldProps<TFields extends FieldValues> = FormInputProps<TFields>;

const normalizeNumberInput = (value: string) => {
    value = value.replace(/[^0-9-]/g, '');
    const isNegative = value.startsWith('-') && value.length > 1;
    value = value.replace(/-/g, '');
    const parsed = parseInt(value, 10);
    const numValue = isNaN(parsed) ? 0 : parsed;
    return isNegative ? -numValue : numValue;
};

function NumberField<TFields extends FieldValues>({
    ...props
}: NumberFieldProps<TFields>) {
    return (
        <FormField
            type="text"
            inputMode="numeric"
            valueCallback={(value: number) => {
                return value.toString();
            }}
            onChangeCallback={normalizeNumberInput}
            {...props}
        />
    );
}

export default NumberField;
