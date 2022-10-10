import { FieldValues } from "react-hook-form";
import FormField from "./FormField";
import { FormInputProps } from "types/ui";
import { datePickerToISODate, isoDateToDatePicker } from "utils/dateHelpers";

type DatePickerProps<TFields extends FieldValues> = FormInputProps<TFields>;

function DatePicker<TFields extends FieldValues>({
    ...props
}: DatePickerProps<TFields>) {
    return (
        <FormField type="date" valueCallback={isoDateToDatePicker} onChangeCallback={datePickerToISODate} {...props} />
    );
}

export default DatePicker;