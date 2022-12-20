import Toggle from 'components/Toggle';
import { Controller, FieldValues } from 'react-hook-form';
import { BaseFormInputProps } from 'types';

type ToggleFieldProps<TFields extends FieldValues> =
    BaseFormInputProps<TFields> & {
        label?: string;
    };

function ToggleField<TFields extends FieldValues>({
    label,
    name,
    control,
    rules,
}: ToggleFieldProps<TFields>) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { value, onChange } }) => (
                <Toggle label={label} checked={value} onChange={onChange} />
            )}
        />
    );
}

export default ToggleField;
