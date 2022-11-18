export const sortAsc = <T>(data: T[], key: (item: T) => string) => {
    return data.sort((a, b) => key(a).localeCompare(key(b)));
}

export const isDefined = <T>(value: T | undefined): value is T => {
    return value !== undefined;
}