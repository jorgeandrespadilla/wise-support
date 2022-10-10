import Toggle from 'components/Toggle';
import { Controller, FieldValues } from 'react-hook-form';
import { BaseFormInputProps } from 'types';

type FormToggleProps<TFields extends FieldValues> = BaseFormInputProps<TFields> & {
    label?: string;
};

function FormToggle<TFields extends FieldValues>({
    label,
    name,
    control,
    rules,
}: FormToggleProps<TFields>) {
  return (
    <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ 
            field: {value, onChange},
        }) => (
            <Toggle label={label} checked={value} onChange={onChange} />
        )}
    />
  );
}

export default FormToggle;