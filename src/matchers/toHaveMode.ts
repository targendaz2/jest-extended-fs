import fs from 'node:fs';
import { expect } from '@jest/globals';
import { ValueError } from 'error-wave';
import { MatcherFunction } from 'expect';
import utils from 'jest-matcher-utils';
import { assertPathIsFile } from 'proveit';
import { parseFileMode } from '../parsers.js';

const toHaveMode: MatcherFunction<[mode: number]> = (actual, mode) => {
    if (!mode) {
        throw new ValueError('The expected mode must not be empty!');
    } else if (mode.toString(8).length !== 3) {
        throw new ValueError(`"${mode.toString(8)}" is not a valid mode!`);
    }

    assertPathIsFile(actual);
    const actualMode = parseFileMode(fs.statSync(actual).mode);
    const expectedMode = Number.parseInt(mode.toString(8));

    const pass = actualMode === expectedMode;
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
