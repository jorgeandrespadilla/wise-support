import { DateTime } from 'luxon';
import { DATE_CONFIG } from '@/constants/settings';

type DayType = 'startOfDay' | 'endOfDay';

/**
 * Formats a date to a string for JSON responses or date string representations.
 * This function should be used to format dates without timezone before sending them to the client.
 * @param date Date to format
 * @returns Date string
 */
export const formatDate = (date: Date) => {
    return normalizeDate(date).toFormat(DATE_CONFIG.shortDateFormat);
};

/**
 * Formats a date to a string for display purposes.
 * @param date Date to format
 * @returns Date string
 */
export const formatDateForDisplay = (date: Date) => {
    return normalizeDate(date).toFormat(DATE_CONFIG.dateDisplayFormat);
};

/**
 * Parses a date (mainly ISO date strings and simple date strings) to a Date object.
 * This function should be used to parse dates from JSON requests through data schemas.
 * No need to normalize the date.
 * @param date Date to parse
 * @returns Date object or null if the input is not a valid date
 */
export const tryParseDate = (input: unknown) => {
    if (input instanceof Date) {
        return input;
    }
    if (typeof input === 'string' || typeof input === 'number') {
        const date = new Date(input);
        if (!isNaN(date.getTime())) {
            return date;
        }
    }
    return null;
};

/**
 * Adds a number of days to a date.
 * @param date Date to add days to
 * @param days Number of days to add
 * @returns Date object
 */
export const addDaysToDate = (date: Date, days: number) => {
    return DateTime.fromJSDate(date).plus({ days }).toJSDate();
};

/**
 * Gets the current date.
 * @returns Date object
 */
export const today = (as: DayType = 'startOfDay') => {
    if (as === 'startOfDay') {
        return normalizeDate(new Date()).toJSDate();
    }
    return normalizeDate(new Date()).endOf('day').toJSDate();
};

/**
 * Gets the current datetime.
 * @returns Date object
 */
export const now = () => {
    return new Date();
};

/**
 * Normalizes a date to a date without time and with UTC timezone.
 * @param date Date to normalize
 * @returns A date without time and with UTC timezone
 */
const normalizeDate = (date: Date) => {
    return DateTime.fromJSDate(date).toUTC().startOf('day');
};
