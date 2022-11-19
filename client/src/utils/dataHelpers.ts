import { parseISODate } from "./dateHelpers";

export const sortAsc = <T>(data: T[], key: (item: T) => string) => {
    return data.sort((a, b) => key(a).localeCompare(key(b)));
}

export const isDefined = <T>(value: T | undefined): value is T => {
    return value !== undefined;
}

export const sortDescByDateTime = <T>(data: T[], key: (item: T) => string) => {
    return data.sort((a, b) => {
        const aDate = parseISODate(key(a));
        const bDate = parseISODate(key(b));
        if (aDate > bDate) {
            return -1;
        }
        if (aDate < bDate) {
            return 1;
        }
        return 0;
    });
}
