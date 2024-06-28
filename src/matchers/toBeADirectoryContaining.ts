import fs from 'node:fs';
import { expect } from '@jest/globals';
import { MatcherFunction } from 'expect';
import utils from 'jest-matcher-utils';
import { assertPathIsDirectory } from '../assertions.js';
import { ValueError } from '../errors.js';

const toBeADirectoryContaining: MatcherFunction<
    [contents: string | string[]]
> = (actual, contents) => {
    if (contents === '') {
        throw new ValueError('The expected value must not be an empty string!');
    }

    if (typeof contents === 'string') {
        contents = [contents];
    }

    assertPathIsDirectory(actual);
    const directoryContents = fs.readdirSync(actual);
    const unmatchedContents = contents.filter(
        (item) => !directoryContents.includes(item),
    );

    const pass = unmatchedContents.length <= 0;
    return {
        pass,
        message: pass
            ? () =>
                  `expected "${actual}" not to contain "${utils.printExpected(unmatchedContents)}"\n${utils.diff(directoryContents, contents)}`
            : () =>
                  `expected "${actual}" to contain "${utils.printExpected(unmatchedContents)}"\n${utils.diff(directoryContents, contents)}`,
    };
};

expect.extend({ toBeADirectoryContaining });

declare module 'expect' {
    interface AsymmetricMatchers {
        /** Checks that a directory contains the given files and directories. */
        toBeADirectoryContaining(contents: string | string[]): void;
    }
    interface Matchers<R> {
        /** Checks that a file contains the given files and directories. */
        toBeADirectoryContaining(contents: string | string[]): R;
    }
}
