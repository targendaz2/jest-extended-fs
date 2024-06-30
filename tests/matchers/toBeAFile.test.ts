import { describe, expect, test } from '@jest/globals';
import tmp from 'tmp';
import '../../src/matchers/toBeAFile.js';

describe('toBeAFile matcher tests', () => {
    test('passes when given an existing file', () => {
        const tmpFile = tmp.fileSync().name;
        expect(tmpFile).toBeAFile();
    });

    test('fails when given an existing directory', () => {
        const tmpDir = tmp.dirSync().name;
        expect(() => expect(tmpDir).toBeAFile()).toThrowError();
    });
});

describe('not toBeAFile matcher tests', () => {
    test('passes when given an existing directory', () => {
        const tmpDir = tmp.dirSync().name;
        expect(tmpDir).not.toBeAFile();
    });

    test('fails when given an existing file', () => {
        const tmpFile = tmp.fileSync().name;
        expect(() => expect(tmpFile).not.toBeAFile()).toThrowError();
    });
});
