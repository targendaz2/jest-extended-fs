import fs from 'node:fs';
import { expect } from '@jest/globals';
import { MatcherFunction } from 'expect';
import { assertPathExists } from 'proveit';

const toBeADirectory: MatcherFunction = (actual) => {
    assertPathExists(actual);

    const pass = fs.statSync(actual).isDirectory();
    return {
        pass,
        message: pass
            ? () => `expected "${actual}" not to be a directory`
            : () => `expected "${actual}" to be a directory`,
    };
};

expect.extend({ toBeADirectory });

declare module 'expect' {
    interface AsymmetricMatchers {
        /** Checks that a file path is a directory. */
        toBeADirectory(): void;
    }
    interface Matchers<R> {
        /** Checks that a file path is a directory. */
        toBeADirectory(): R;
    }
}
