import { PathLike } from 'node:fs';
import { ValueError } from './errors.js';

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
 * Converts a Unix file mode to an octal number.
 * @param {number} mode A Unix file mode.
 * @returns {number} The mode as an octal number.
 * @throws {ValueError} If the given mode is not a valid Unix file mode.
 */
export function parseUnixFileMode(mode: number): number {
    if (typeof mode !== 'number') {
        throw new TypeError('Param "mode" must be a number.');
    }

    const parsedMode = Number.parseInt(
        '0' + (mode & parseInt('777', 8)).toString(8),
    );

    if (parsedMode.toString().length !== 3) {
        throw new ValueError('Param "mode" must be a valid Unix file mode.');
    }

    return parsedMode;
}
