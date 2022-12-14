import { DateTime } from 'luxon';

export const formatDate = (date: Date) => {
    return DateTime.fromJSDate(date).toFormat('dd/MM/yyyy');
}

export const tryParseDate = (date: any) => {
    if (typeof date === "string" || date instanceof Date) return new Date(date);
    return date;
}

export const addDays = (date: Date, days: number) => {
    return DateTime.fromJSDate(date).plus({ days }).toJSDate();
}

export const today = () => {
    return DateTime.now().toJSDate();
}