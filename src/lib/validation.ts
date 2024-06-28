import { PathLike } from 'node:fs';

/**
 * Checks if the given value is {@link PathLike}.
 * @param {*} value A value of any type.
 * @returns {boolean} Whether the given value is PathLike.
 */
export function isPathLike(value: any): value is PathLike {
    return (
        typeof value === 'string' ||
        value instanceof Buffer ||
        value instanceof URL
    );
}

/**
 * Checks if the given value could be a Unix file mode.
 * @param {*} value A value of any type.
 * @returns {boolean} Whether the given value could be a Unix file mode.
 */
export function isUnixFileMode(value: any): value is number {
    return typeof value === 'number' && value.toString().length === 3;
}
