import Input from "./Input";
import { DateTime, datePickerToDate, dateToDatePicker } from "utils/dateHelpers";
import { BaseInputProps } from "types/ui";

type DatePickerProps = BaseInputProps<DateTime>;

function DatePicker({
    value,
    onChange = () => { },
    ...props
}: DatePickerProps) {

    const handleChange = (value: string) => {
        const date = datePickerToDate(value);
        onChange(date);
    }

    return (
        <Input type="date" value={dateToDatePicker(value)} onChange={handleChange} {...props} />
    );
}

export default DatePicker;