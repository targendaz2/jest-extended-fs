import { describe, expect, test } from '@jest/globals';
import tmp from 'tmp';
import '../../src/matchers/toBeADirectory.js';

describe('toBeADirectory matcher tests', () => {
    test('passes when given an existing directory', () => {
        const tmpDir = tmp.dirSync().name;
        expect(tmpDir).toBeADirectory();
    });

    test('fails when given an existing file', () => {
        const tmpFile = tmp.fileSync().name;
        expect(() => expect(tmpFile).toBeADirectory()).toThrowError();
    });
});

describe('not toBeADirectory matcher tests', () => {
    test('passes when given an existing file', () => {
        const tmpFile = tmp.fileSync().name;
        expect(tmpFile).not.toBeADirectory();
    });

    test('fails when given an existing directory', () => {
        const tmpDir = tmp.dirSync().name;
        expect(() => expect(tmpDir).not.toBeADirectory()).toThrowError();
    });
});
