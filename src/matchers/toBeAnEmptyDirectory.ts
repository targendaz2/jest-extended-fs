import fs from 'node:fs';
import { expect } from '@jest/globals';
import { MatcherFunction } from 'expect';
import { assertPathIsDirectory } from 'proveit';

const toBeAnEmptyDirectory: MatcherFunction = (actual) => {
    assertPathIsDirectory(actual);
    const directoryContents = fs.readdirSync(actual);

    const pass = directoryContents.length <= 0;
    return {
        pass,
        message: pass
            ? () => `expected "${actual}" not to be empty`
            : () => `expected "${actual}" to be empty`,
    };
};

expect.extend({ toBeAnEmptyDirectory });

declare module 'expect' {
    interface AsymmetricMatchers {
        /** Checks that a directory is empty. */
        toBeAnEmptyDirectory(): void;
    }
    interface Matchers<R> {
        /** Checks that a directory is empty. */
        toBeAnEmptyDirectory(): R;
    }
}
