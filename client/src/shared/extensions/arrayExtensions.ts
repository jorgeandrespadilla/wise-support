/* eslint-disable no-extend-native */

export function isEmpty<T>(this: Array<T>): boolean {
    return this.length === 0;
}
Array.prototype.isEmpty = isEmpty;

export function isLast<T>(this: Array<T>, index: number): boolean {
    return index === this.length - 1;
}
Array.prototype.isLast = isLast;
