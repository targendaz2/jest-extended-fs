import fs from 'node:fs';
import { expect } from '@jest/globals';
import { MatcherFunction } from 'expect';
import { assertIsPathLike } from 'proveit';

const toExist: MatcherFunction = (actual) => {
    assertIsPathLike(actual);

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
