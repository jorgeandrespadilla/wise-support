import { DateTime } from 'luxon';

export { DateTime } from 'luxon';

const datePickerFormat = 'yyyy-MM-dd';
const dateStrFormat = 'dd/MM/yyyy';

type TimeZone = 'utc' | 'local';

/**
 * Normalizes a DateTime object to a date without time and with default timezone.
 * IMPORTANT: Use with caution! Server should handle client date timezone.
 * @param date DateTime object to normalize
 * @param zone Timezone to use
 * @returns A date without time and with the specified timezone
 */
export function normalizeDate(date: DateTime, zone: TimeZone = 'utc'): DateTime {
    if (zone === 'utc') {
        return date.toUTC().startOf('day');
    }
    return date.startOf('day');
}

/**
 * Converts a JS Date object to a Luxon DateTime object
 * @note To convert a DateTime object to a JS Date object, use `date.toJSDate()`
 * @param date Date object
 * @returns DateTime object
 */
 export function parseJSDate(date: Date): DateTime {
    return DateTime.fromJSDate(date);
}

/**
 * Converts a date string in ISO format to a DateTime object.
 * @param dateStr Date in ISO format (yyyy-MM-ddTHH:mm:ss.sssZ)
 * @returns DateTime object
 */
export function parseISODate(dateStr: string): DateTime {
    return DateTime.fromISO(dateStr);
}

/**
 * Converts a DateTime object to a date string in the format dd/MM/yyyy
 * @param date DateTime object to format
 * @returns Formatted date string
 */
export function formatDate(date: DateTime): string {
    return date.toFormat(dateStrFormat);
}

/**
 * Converts a date picker string (yyyy-MM-dd) to a ISO date string
 * @param date Date picker string
 * @returns ISO date string
 */
export function datePickerToISODate(date: string): string {
    return DateTime.fromFormat(date, datePickerFormat).toISO();
}

/**
 * Converts a ISO date string to a date picker string (yyyy-MM-dd)
 * @param date ISO date string
 * @returns Date picker string
 */
export function isoDateToDatePicker(date: string): string {
    return parseISODate(date).toFormat(datePickerFormat);
}

export function today(): DateTime {
    return DateTime.now();
}
