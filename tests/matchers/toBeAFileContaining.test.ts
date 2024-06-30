import fs from 'node:fs';
import { describe, expect, test } from '@jest/globals';
import tmp from 'tmp';
import '../../src/matchers/toBeAFileContaining.js';

describe('toBeAFileContaining matcher tests', () => {
    test('passes when the given file contains the given text', () => {
        const tmpFile = tmp.fileSync().name;
        fs.writeFileSync(tmpFile, 'Hello, world!');

        expect(tmpFile).toBeAFileContaining('Hello, world!');
    });

    test('fails when the given file does not contain the given text', () => {
        const tmpFile = tmp.fileSync().name;
        fs.writeFileSync(tmpFile, 'Hello, world!');

        expect(() =>
            expect(tmpFile).toBeAFileContaining('Hello, everyone!'),
        ).toThrowError();
    });
});

describe('not toBeAFileContaining matcher tests', () => {
    test('passes when the given file does not contain the given text', () => {
        const tmpFile = tmp.fileSync().name;
        fs.writeFileSync(tmpFile, 'Hello, world!');

        expect(tmpFile).not.toBeAFileContaining('Hello, everyone!');
    });

    test('fails when the given file contains the given text', () => {
        const tmpFile = tmp.fileSync().name;
        fs.writeFileSync(tmpFile, 'Hello, world!');

        expect(() =>
            expect(tmpFile).not.toBeAFileContaining('Hello, world!'),
        ).toThrowError();
    });
});
