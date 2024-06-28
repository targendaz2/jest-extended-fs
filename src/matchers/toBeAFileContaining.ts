import fs from 'node:fs';
import { expect } from '@jest/globals';
import { MatcherFunction } from 'expect';
import utils from 'jest-matcher-utils';
import { assertPathIsFile } from '../assertions.js';
import { ValueError } from '../errors.js';

const toBeAFileContaining: MatcherFunction<[text: string]> = (actual, text) => {
    if (text === '') {
        throw new ValueError('The expected value must not be an empty string!');
    }

    assertPathIsFile(actual);
    const contents = fs.readFileSync(actual, 'utf8');

    const pass = contents.includes(text);
    return {
        pass,
        message: pass
            ? () =>
                  `expected "${actual}" not to contain "${utils.printExpected(text)}"`
            : () =>
                  `expected "${actual}" to contain "${utils.printExpected(text)}"`,
    };
};

expect.extend({ toBeAFileContaining });

declare module 'expect' {
    interface AsymmetricMatchers {
        /** Checks that a file contains the given text. */
        toBeAFileContaining(text: string): void;
    }
    interface Matchers<R> {
        /** Checks that a file contains the given text. */
        toBeAFileContaining(text: string): R;
    }
}
