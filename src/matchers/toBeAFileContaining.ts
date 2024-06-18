import fs from 'node:fs';
import { expect } from '@jest/globals';
import { MatcherFunction } from 'expect';
import utils from 'jest-matcher-utils';
import { FileSystemError, ValueError } from '../errors.js';
import { isPathLike } from '../utils.js';

const toBeAFileContaining: MatcherFunction<[text: string]> = (actual, text) => {
    if (!isPathLike(actual)) {
        throw new TypeError('This must be of type PathLike!');
    } else if (actual === '') {
        throw new ValueError('This must not be an empty string!');
    } else if (!fs.existsSync(actual)) {
        throw new FileSystemError(`Path "${actual}" does not exist!`);
    } else if (!fs.statSync(actual).isFile()) {
        throw new FileSystemError(`Path "${actual}" is not a file!`);
    } else if (text === '') {
        throw new ValueError('The expected value must not be an empty string!');
    }

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
