import fs from 'node:fs';
import { expect } from '@jest/globals';
import { MatcherFunction } from 'expect';
import { ValueError } from '../errors.js';
import { isPathLike } from '../utils.js';

const toExist: MatcherFunction = (actual) => {
    if (!isPathLike(actual)) {
        throw new TypeError('This must be of type PathLike!');
    } else if (actual === '') {
        throw new ValueError('This must not be an empty string!');
    }

    const pass = fs.existsSync(actual);
    return {
        pass,
        message: pass
            ? () => `expected "${actual}" not to exist`
            : () => `expected "${actual}" to exist`,
    };
};

expect.extend({ toExist });

declare module 'expect' {
    interface AsymmetricMatchers {
        /** Checks that a file path exists. */
        toExist(): void;
    }
    interface Matchers<R> {
        /** Checks that a file path exists. */
        toExist(): R;
    }
}
