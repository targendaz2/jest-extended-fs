import crypto from 'node:crypto';
import path from 'node:path';
import { describe, expect, test } from '@jest/globals';
import tmp from 'tmp';
import { FileSystemError, ValueError } from '../src/errors.js';
import {
    assertIsPath,
    assertPathExists,
    assertPathIsDirectory,
    assertPathIsFile,
} from '../src/lib/assertions.js';

describe('PathLike assertion tests', () => {
    test('passes when given a string', () => {
        const stringPath = 'this is a string';
        expect(() => assertIsPath(stringPath)).not.toThrowError();
    });

    test('passes when given a Buffer', () => {
        const bufferPath = Buffer.from('this is a Buffer');
        expect(() => assertIsPath(bufferPath)).not.toThrowError();
    });

    test('passes when given a URL', () => {
        const url = new URL('https://example.com');
        expect(() => assertIsPath(url)).not.toThrowError();
    });

    test('fails when given a non-PathLike value', () => {
        const nonPathLike = 17;
        expect(() => assertIsPath(nonPathLike)).toThrowError(TypeError);
    });

    test('fails when given an empty string', () => {
        const emptyPath = '';
        expect(() => assertIsPath(emptyPath)).toThrowError(ValueError);
    });
});

describe('path exists assertion tests', () => {
    test('passes when given an existing file', () => {
        const tmpFile = tmp.fileSync().name;
        expect(() => assertPathExists(tmpFile)).not.toThrowError();
    });

    test('passes when given an existing directory', () => {
        const tmpDir = tmp.dirSync().name;
        expect(() => assertPathExists(tmpDir)).not.toThrowError();
    });

    test('fails when given a non-existent path', () => {
        const tmpPath = path.resolve('/tmp', crypto.randomUUID());
        expect(() => assertPathExists(tmpPath)).toThrowError(FileSystemError);
    });
});

describe('file assertion tests', () => {
    test('passes when given an existing file', () => {
        const tmpFile = tmp.fileSync().name;
        expect(() => assertPathIsFile(tmpFile)).not.toThrowError();
    });

    test('fails when given an existing directory', () => {
        const tmpDir = tmp.dirSync().name;
        expect(() => assertPathIsFile(tmpDir)).toThrowError(FileSystemError);
    });
});

describe('directory assertion tests', () => {
    test('passes when given an existing directory', () => {
        const tmpDir = tmp.dirSync().name;
        expect(() => assertPathIsDirectory(tmpDir)).not.toThrowError();
    });

    test('fails when given an existing file', () => {
        const tmpFile = tmp.fileSync().name;
        expect(() => assertPathIsDirectory(tmpFile)).toThrowError(
            FileSystemError,
        );
    });
});
