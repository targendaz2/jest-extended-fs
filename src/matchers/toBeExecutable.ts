import fs, { constants } from 'node:fs';
import { expect } from '@jest/globals';
import { MatcherFunction } from 'expect';
import { assertPathIsFile } from '../lib/assertions.js';

const toBeExecutable: MatcherFunction = (actual) => {
    assertPathIsFile(actual);

    let pass: boolean;
    try {
        fs.accessSync(actual, constants.X_OK);
        pass = true;
    } catch (err) {
        pass = false;
    }

    return {
        pass,
        message: pass
            ? () => `expected "${actual}" not to be executable`
            : () => `expected "${actual}" to be executable`,
    };
};

expect.extend({ toBeExecutable });

declare module 'expect' {
    interface AsymmetricMatchers {
        /** Checks that a file is executable by the current user. */
        toBeExecutable(): void;
    }
    interface Matchers<R> {
        /** Checks that a file is executable by the current user. */
        toBeExecutable(): R;
    }
}
