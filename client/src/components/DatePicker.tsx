import Input from "./Input";
import { dateToDatePicker } from "utils/dateHelpers";

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
        const date = new Date(value);
        onChange(date);
    }

    return (
        <Input type="date" value={dateToDatePicker(value)} onChange={handleChange} label={label} />
    );
}

export default DatePicker;