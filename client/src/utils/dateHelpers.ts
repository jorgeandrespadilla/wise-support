import { format, parse } from 'date-fns';

const datePickerFormat = 'yyyy-MM-dd';
const dateStrFormat = 'dd/MM/yyyy';

export function datePickerToDate(date: string) {
    return parse(date, datePickerFormat, new Date());
}

export function dateToDatePicker(date: Date) {
    return format(date, datePickerFormat);
}

export function dateToDateStr(date: Date) {
    return format(date, dateStrFormat);
}