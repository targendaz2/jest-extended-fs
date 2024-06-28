import fs from 'node:fs';
import { expect } from '@jest/globals';
import { MatcherFunction } from 'expect';
import { assertPathIsFile } from '../assertions.js';

const toBeAnEmptyFile: MatcherFunction = (actual) => {
    assertPathIsFile(actual);
    const contents = fs.readFileSync(actual, 'utf8');

    const pass = contents === '';
    return {
        pass,
        message: pass
            ? () => `expected "${actual}" not to be empty"`
            : () => `expected "${actual}" to be empty`,
    };
};

expect.extend({ toBeAnEmptyFile });

declare module 'expect' {
    interface AsymmetricMatchers {
        /** Checks that a file is empty. */
        toBeAnEmptyFile(): void;
    }
    interface Matchers<R> {
        /** Checks that a file is empty. */
        toBeAnEmptyFile(): R;
    }
}
