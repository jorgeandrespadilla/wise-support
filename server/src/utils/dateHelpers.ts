import { DateTime } from 'luxon';

/**
 * Normalizes a DateTime object to a date removing timezone 
 * @param date DateTime object to normalize
 * @returns A date without time and with the specified timezone
 */
export function normalizeDate(date: DateTime): DateTime {
    const dateWithoutTime = date.startOf('day').plus({ minutes: date.offset });
    return dateWithoutTime;
}

export const formatDate = (date: Date) => {
    return DateTime.fromJSDate(date).toFormat('dd/MM/yyyy');
}

export const tryParseDate = (date: any) => {
    if (typeof date === "string" || date instanceof Date) {
        return normalizeDate(DateTime.fromJSDate(new Date(date))).toJSDate();
    }
    return date;
}

export const addDays = (date: Date, days: number) => {
    return DateTime.fromJSDate(date).plus({ days }).toJSDate();
}

export const today = () => {
    return DateTime.now().toJSDate();
}