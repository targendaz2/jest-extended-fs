import fs from 'node:fs';
import { expect } from '@jest/globals';
import { MatcherFunction } from 'expect';
import { assertPathExists } from '../lib/assertions.js';

const toBeAFile: MatcherFunction = (actual) => {
    assertPathExists(actual);

    const pass = fs.statSync(actual).isFile();
    return {
        pass,
        message: pass
            ? () => `expected "${actual}" not to be a file`
            : () => `expected "${actual}" to be a file`,
    };
};

expect.extend({ toBeAFile });

declare module 'expect' {
    interface AsymmetricMatchers {
        /** Checks that a file path is a file. */
        toBeAFile(): void;
    }
    interface Matchers<R> {
        /** Checks that a file path is a file. */
        toBeAFile(): R;
    }
}
