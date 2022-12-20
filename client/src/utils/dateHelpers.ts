import { DateTime } from 'luxon';

export { DateTime } from 'luxon';

const datePickerFormat = 'yyyy-MM-dd';
const dateDisplayFormat = 'dd/MM/yyyy';
const datetimeDisplayFormat = 'dd/MM/yyyy HH:mm';

/**
 * Timezone format.
 * 'local' - Local timezone
 * 'utc' - UTC timezone
 */
type TimezoneFormat = 'local' | 'utc';

/**
 * Date format.
 * 'default' - Default date format (simple date string)
 * 'iso' - ISO date format
 */
type DateFormat = 'default' | 'iso';

/**
 * Date format for display.
 * 'date' - Date only
 * 'datetime' - Date and time
 */
type DisplayFormat = 'date' | 'datetime';

/**
 * Formats a date to a string for display purposes.
 * @param date Date to format
 * @returns Date string
 */
export const formatDateForDisplay = (
    date: Date,
    zone: TimezoneFormat = 'utc',
    display: DisplayFormat = 'date',
): string => {
    const displayFormat =
        display === 'date' ? dateDisplayFormat : datetimeDisplayFormat;
    if (zone === 'utc') {
        return normalizeDate(date).toFormat(displayFormat);
    }
    return DateTime.fromJSDate(date).toFormat(displayFormat);
};

/**
 * Converts a date picker string to a ISO date string.
 * @param date Date picker string
 * @returns ISO date string
 */
export const datePickerToISODate = (date: string): string => {
    return DateTime.fromFormat(date, datePickerFormat, { zone: 'utc' }).toISO();
};

/**
 * Converts a ISO date string to a date picker string.
 * @param date ISO date string
 * @returns Date picker string
 */
export function isoDateToDatePicker(date: string): string {
    return DateTime.fromISO(date, { zone: 'utc' }).toFormat(datePickerFormat);
}

/**
 * Returns the current date.
 * @param format Format of the date to return
 * @returns Current date
 */
export const today = (format: DateFormat = 'default'): string => {
    const currentDate = new Date();
    if (format === 'iso') {
        const date = DateTime.fromJSDate(currentDate)
            .plus({ minutes: timezoneOffset() })
            .toJSDate();
        return normalizeDate(date).toISO();
    }
    return normalizeDate(currentDate, 'local').toFormat(datePickerFormat);
};

/**
 * Parses a date (mainly ISO date strings and simple date strings) to a Date object.
 * Useful for parsing dates from a form schema.
 * No need to normalize the date.
 * @param date Date to parse
 * @returns Date object
 */
export const tryParseDate = (date: any) => {
    if (typeof date === 'string' || date instanceof Date) {
        return new Date(date);
    }
    return date;
};

/**
 * Normalizes a date in ISO format to a date in ISO format subtracting the timezone offset.
 * @param date Date to normalize
 * @returns A date without time and with UTC timezone
 */
export const normalizeTimezone = (dateStr: string) => {
    const date = DateTime.fromISO(dateStr, { zone: 'utc' });
    return date.minus({ minutes: timezoneOffset() }).toISO();
};

/**
 * Normalizes a date to a date without time and with UTC timezone.
 * @param date Date to normalize
 * @returns A date without time and with UTC timezone
 */
const normalizeDate = (date: Date, zone: TimezoneFormat = 'utc') => {
    if (zone === 'utc') {
        return DateTime.fromJSDate(date).toUTC().startOf('day');
    }
    return DateTime.fromJSDate(date).startOf('day');
};

/**
 * Gets the local timezone offset.
 * @returns Timezone offset in minutes.
 */
const timezoneOffset = () => {
    return DateTime.local().offset;
};
