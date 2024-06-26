import fs from 'node:fs';
import { expect } from '@jest/globals';
import { MatcherFunction } from 'expect';
import utils from 'jest-matcher-utils';
import { FileSystemError, ValueError } from '../errors.js';
import { isPathLike, parseUnixFileMode } from '../utils.js';

const toHaveMode: MatcherFunction<[mode: number]> = (actual, mode) => {
    if (!isPathLike(actual)) {
        throw new TypeError('This must be of type PathLike!');
    } else if (actual === '') {
        throw new ValueError('This must not be an empty string!');
    } else if (!fs.existsSync(actual)) {
        throw new FileSystemError(`Path "${actual}" does not exist!`);
    } else if (!fs.statSync(actual).isFile()) {
        throw new FileSystemError(`Path "${actual}" is not a file!`);
    } else if (!mode) {
        throw new ValueError('The expected mode must not be empty!');
    } else if (mode.toString(8).length !== 3) {
        throw new ValueError(`"${mode.toString(8)}" is not a valid mode!`);
    }

    const actualMode = parseUnixFileMode(fs.statSync(actual).mode);
    const expectedMode = mode.toString(8);

    const pass = actualMode === Number.parseInt(expectedMode);
    return {
        pass,
        message: pass
            ? () =>
                  `expected "${actual}" not to have mode "${utils.printExpected(expectedMode)}"`
            : () =>
                  `expected "${actual}" to have mode "${utils.printExpected(expectedMode)}"\ninstead, it had mode "${utils.printReceived(actualMode)}"`,
    };
};

expect.extend({ toHaveMode });

declare module 'expect' {
    interface AsymmetricMatchers {
        /** Checks that a file has the given mode. */
        toHaveMode(mode: number): void;
    }
    interface Matchers<R> {
        /** Checks that a file has the given mode. */
        toHaveMode(mode: number): R;
    }
}
