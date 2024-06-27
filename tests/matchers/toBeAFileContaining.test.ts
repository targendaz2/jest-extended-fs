import fs from 'node:fs';
import { describe, expect, test } from '@jest/globals';
import tmp from 'tmp';
import { FileSystemError, ValueError } from '../../src/errors.js';
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

    test('fails when provided an empty string', () => {
        const tmpFile = tmp.fileSync().name;
        fs.writeFileSync(tmpFile, 'Hello, world!');

        expect(() => expect(tmpFile).toBeAFileContaining('')).toThrowError(
            ValueError,
        );
    });

    test('fails when provided a directory', () => {
        const tmpDir = tmp.dirSync().name;

        expect(() =>
            expect(tmpDir).toBeAFileContaining('Hello, world!'),
        ).toThrowError(FileSystemError);
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

    test('fails when provided an empty string', () => {
        const tmpFile = tmp.fileSync().name;
        fs.writeFileSync(tmpFile, 'Hello, world!');

        expect(() => expect(tmpFile).not.toBeAFileContaining('')).toThrowError(
            ValueError,
        );
    });

    test('fails when provided a directory', () => {
        const tmpDir = tmp.dirSync().name;

        expect(() =>
            expect(tmpDir).not.toBeAFileContaining('Hello, world!'),
        ).toThrowError(FileSystemError);
    });
});
