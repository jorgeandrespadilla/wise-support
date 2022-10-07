import { 
    datePickerToDate,
    dateToDatePicker,
    dateToDateStr
} from './dateHelpers';

describe("dateHelpers", () => {
    describe("datePickerToDate", () => {
        it("should convert a date picker format to a correct date", () => {
            const date = datePickerToDate("2019-09-10");
            expect(date.getDate()).toBe(10);
            expect(date.getMonth()).toBe(8);
            expect(date.getFullYear()).toBe(2019);
        });
    });
    describe("dateToDatePicker", () => {
        it("should convert a date to a correct date picker format", () => {
            const date = new Date(2019, 8, 10);
            const datePickerDate = dateToDatePicker(date);
            expect(datePickerDate).toBe("2019-09-10");
        });
    });
    describe("dateToDateStr", () => {
        it("should convert a date to a correct date string format", () => {
            const date = new Date(2019, 8, 10);
            const dateStr = dateToDateStr(date);
            expect(dateStr).toBe("10/09/2019");
        });
    });
});