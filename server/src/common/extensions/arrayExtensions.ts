export function isEmpty<T>(this: Array<T>): boolean {
    return this.length === 0;
}
Array.prototype.isEmpty = isEmpty;

export function last<T>(this: Array<T>): T | undefined {
    return this.at(-1);
}
Array.prototype.last = last;
