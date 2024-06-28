import fs from 'node:fs';
import { describe, expect, test } from '@jest/globals';
import tmp from 'tmp';
// import { FileSystemError, ValueError } from '../../src/errors.js';
import '../../src/matchers/toBeAnEmptyFile.js';

describe('toBeAnEmptyFile matcher tests', () => {
    test('passes when the given file is empty', () => {
        const tmpFile = tmp.fileSync().name;

        expect(tmpFile).toBeAnEmptyFile();
    });

    test('fails when the given file is not empty', () => {
        const tmpFile = tmp.fileSync().name;
        fs.writeFileSync(tmpFile, 'Hello, world!');

        expect(() => expect(tmpFile).toBeAnEmptyFile()).toThrowError();
    });
});

describe('not toBeAnEmptyFile matcher tests', () => {
    test('fails when the given file is empty', () => {
        const tmpFile = tmp.fileSync().name;

        expect(() => expect(tmpFile).not.toBeAnEmptyFile()).toThrowError();
    });

    test('passes when the given file is not empty', () => {
        const tmpFile = tmp.fileSync().name;
        fs.writeFileSync(tmpFile, 'Hello, world!');

        expect(tmpFile).not.toBeAnEmptyFile();
    });
});
