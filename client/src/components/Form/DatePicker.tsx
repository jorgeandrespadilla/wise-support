import { FieldValues } from "react-hook-form";
import FormField from "./FormField";
import { DateFormat, FormInputProps } from "types/ui";
import { datePickerToISODate, isoDateToDatePicker } from "utils/dateHelpers";

type DatePickerProps<TFields extends FieldValues> = FormInputProps<TFields> & {
    dateFormat?: DateFormat;
};

function DatePicker<TFields extends FieldValues>({
    dateFormat = "default",
    ...props
}: DatePickerProps<TFields>) {
    const valueCallback = dateFormat === "default" ? undefined : isoDateToDatePicker;
    const onChangeCallback = dateFormat === "default" ? undefined : datePickerToISODate;

    return (
        <FormField type="date" valueCallback={valueCallback} onChangeCallback={onChangeCallback} {...props} />
    );
}

export default DatePicker;