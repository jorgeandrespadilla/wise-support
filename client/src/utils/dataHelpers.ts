import { tryParseDate } from "./dateHelpers";

export const sortAsc = <T>(data: T[], key: (item: T) => string) => {
    return data.sort((a, b) => key(a).localeCompare(key(b)));
}

export const isDefined = <T>(value: T | undefined): value is T => {
    return value !== undefined;
}

export const getInitials = (name: string) => {
    if (!name) {
        return "";
    }
    const names = name.toUpperCase().split(" ");
    return names.length > 1 ? names[0][0] + names[1][0] : names[0][0];
}

export const pluralize = (count: number, singular: string, plural: string) => {
    return count === 1 ? singular : plural;
}

export const sortDescByDateTime = <T>(data: T[], key: (item: T) => string) => {
    return data.sort((a, b) => {
        const aDate = tryParseDate(key(a));
        const bDate = tryParseDate(key(b));
        if (aDate > bDate) {
            return -1;
        }
        if (aDate < bDate) {
            return 1;
        }
        return 0;
    });
}
