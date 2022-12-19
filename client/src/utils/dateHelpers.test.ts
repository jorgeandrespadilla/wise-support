import { padStart } from 'lodash';
import {
    formatDateForDisplay,
    datePickerToISODate,
    isoDateToDatePicker,
    tryParseDate,
    normalizeTimezone,
    today,
} from './dateHelpers';

const expectedDate = (date: Date, delimiter: string) => {
    const day = padStart(date.getDate().toString(),2,'0');
    const month = padStart((date.getMonth() + 1).toString(),2,'0');
    const year = date.getFullYear().toString();
    return `${day}${delimiter}${month}${delimiter}${year}`;
}

const expectedDateInverse = (date: Date, delimiter: string) => {
    const day = padStart(date.getDate().toString(),2,'0');
    const month = padStart((date.getMonth() + 1).toString(),2,'0');
    const year = date.getFullYear().toString();
    return `${year}${delimiter}${month}${delimiter}${day}`;
}

describe("dateHelpers", () => {
    describe("formatDateForDisplay", () => {
        it("should convert a date object to a correct UTC date format", () => {
            const date = new Date("2019-08-10");
            const dateStr = formatDateForDisplay(date);
            expect(dateStr).toBe("10/08/2019");
        });
        it("should convert a date object to a correct local date format", () => {
            const date = new Date("2019-08-10");
            const dateStr = formatDateForDisplay(date, "local");
            expect(dateStr).toBe(expectedDate(date, "/"));
        });
    });
    describe("datePickerToISODate", () => {
        it("should convert a date picker format to a correct ISO date", () => {
            const isoDate = datePickerToISODate("2019-09-10");            
            expect(isoDate).toBe("2019-09-10T00:00:00.000Z");
       });
    });
    describe("isoDateToDatePicker", () => {
        it("should convert a ISO date to a correct date picker format", () => {
            const datePickerDate = isoDateToDatePicker("2019-09-10T00:00:00.000Z");
            expect(datePickerDate).toBe("2019-09-10");
        });
    });
    describe("today", () => {
        it("should return the current date in ISO format", () => {
            const todayDate = today("iso");
            const expected = expectedDateInverse(new Date(), "-");
            expect(todayDate).toBe(`${expected}T00:00:00.000Z`);
        });
        it("should return the current date in date picker format", () => {
            const todayDate = today();
            const expected = expectedDateInverse(new Date(), "-");
            expect(todayDate).toBe(expected);
        });
    });
    describe("tryParseDate", () => {
        it("should parse a date string in ISO format to a date object", () => {
            const isoDate = "2020-01-01T00:00:00.000Z";
            const date: Date = tryParseDate(isoDate);
            expect(date.toISOString()).toBe(isoDate);
        });
        it("should parse a simple date string to a date object", () => {
            const simpleDate = "2020-01-01";
            const date: Date = tryParseDate(simpleDate);
            expect(date.toISOString()).toBe("2020-01-01T00:00:00.000Z");
        });
    });
    describe("normalizeTimezone", () => {
        it("should normalize a date in ISO format to a date in ISO format subtracting the timezone offset", () => {
            const initialIsoDate = "2020-01-01T00:00:00.000Z";
            const initialDate: Date = tryParseDate(initialIsoDate);
            const finalIsoDate = normalizeTimezone(initialIsoDate);
            const finalDate: Date = tryParseDate(finalIsoDate);
            const offset = initialDate.getTimezoneOffset() * 60 * 1000;
            expect(finalDate.getTime()).toBe(initialDate.getTime() + offset);
        });
    });
});