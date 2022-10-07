import Input from "./Input";
import { datePickerToDate, dateToDatePicker } from "utils/dateHelpers";

type DatePickerProps = {
    label?: string;
    value: Date;
    onChange?: (date: Date) => void;
}     

function DatePicker({
    label,
    value,
    onChange = () => {},
}: DatePickerProps) {

    const handleChange = (value: string) => {
        const date = datePickerToDate(value);
        onChange(date);
    }

    return (
        <Input type="date" value={dateToDatePicker(value)} onChange={handleChange} label={label} />
    );
}

export default DatePicker;