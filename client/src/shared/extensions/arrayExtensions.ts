/* eslint-disable no-extend-native */

export function isEmpty<T>(this: Array<T>): boolean {
    return this.length === 0;
}
Array.prototype.isEmpty = isEmpty;

