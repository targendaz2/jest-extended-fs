import { ValueError } from 'error-wave';
import { isUnixFileMode } from 'proveit';

/**
 * Converts a file mode retrieved by Node.js to a Unix file mode.
 * @param {number} mode A file mode retrieved by Node.js.
 * @returns {number} The Unix file mode.
 * @throws {ValueError} If the given mode cannot be converted to a Unix file mode.
 */
export function parseFileMode(mode: number): number {
    const parsedMode = Number.parseInt(
        '0' + (mode & parseInt('777', 8)).toString(8),
    );

    if (!isUnixFileMode(parsedMode)) {
        throw new ValueError(
            'Param "mode" cannot be converted to a Unix file mode.',
        );
    }

    return parsedMode;
}
