import fs from 'node:fs';
import { expect } from '@jest/globals';
import { MatcherFunction } from 'expect';
import { FileSystemError, ValueError } from '../errors.js';
import { isPathLike } from '../utils.js';

const toBeADirectory: MatcherFunction = (actual) => {
    if (!isPathLike(actual)) {
        throw new TypeError('This must be of type PathLike!');
    } else if (actual === '') {
        throw new ValueError('This must not be an empty string!');
    } else if (!fs.existsSync(actual)) {
        throw new FileSystemError(`Path "${actual}" does not exist!`);
    }

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
