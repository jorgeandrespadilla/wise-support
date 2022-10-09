import { DateTime } from 'luxon';
import {
    normalizeDate,
    parseJSDate,
    parseISODate,
    formatDate,
    datePickerToDate,
    dateToDatePicker,
} from './dateHelpers';

describe("dateHelpers", () => {
    describe("normalizeDate", () => {
        it("should return a date without time and with default timezone", () => {
            const date = new Date("2020-01-01T06:31:10.000Z");
            const result = normalizeDate(DateTime.fromJSDate(date));
            expect(result.get("second")).toBe(0);
            expect(result.get("minute")).toBe(0);
            expect(result.get("hour")).toBe(0);
            expect(result.get("day")).toBe(1);
            expect(result.get("month")).toBe(1);
            expect(result.get("year")).toBe(2020);
        });
    });
    describe("parseJSDate", () => {
        it("should parse a JS Date object to a DateTime object", () => {
            const date = parseJSDate(new Date(2020, 0, 1));
            expect(date.get("day")).toBe(1);
            expect(date.get("month")).toBe(1);
            expect(date.get("year")).toBe(2020);
        });
    });
    describe("parseISODate", () => {
        it("should parse a date string in ISO format to a DateTime object", () => {
            const isoDate = "2020-01-01T00:00:00.000Z";
            const date = parseISODate(isoDate);
            expect(date.get("day")).toBe(1);
            expect(date.get("month")).toBe(1);
            expect(date.get("year")).toBe(2020);
        });
    });
    describe("formatDate", () => {
        it("should convert a date to a correct date string format", () => {
            const date = parseJSDate(new Date(2019, 8, 10));
            const dateStr = formatDate(date);
            expect(dateStr).toBe("10/09/2019");
        });
    });
    describe("datePickerToDate", () => {
        it("should convert a date picker format to a correct date", () => {
            const date = datePickerToDate("2019-09-10");
            expect(date.get("day")).toBe(10);
            expect(date.get("month")).toBe(9);
        });
    });
    describe("dateToDatePicker", () => {
        it("should convert a date to a correct date picker format", () => {
            const date = new Date(2019, 8, 10);
            const datePickerDate = dateToDatePicker(parseJSDate(date));
            expect(datePickerDate).toBe("2019-09-10");
        });
    });
});