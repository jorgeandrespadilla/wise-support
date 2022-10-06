const zeroPad = (num: number, places: number) => String(num).padStart(places, '0');

export function dateToDatePicker(date: Date) {
    const year = date.getFullYear();
    const month = zeroPad(date.getMonth() + 1, 2);
    const day = zeroPad(date.getDate(), 2);
    return `${year}-${month}-${day}`;
}