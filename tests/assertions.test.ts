import crypto from 'node:crypto';
import path from 'node:path';
import { describe, expect, test } from '@jest/globals';
import tmp from 'tmp';
import { FileSystemError, ValueError } from '../src/errors.js';
import { assertIsPath, assertPathExists } from '../src/lib/assertions.js';

describe('PathLike assertion tests', () => {
    test('passes when given a string', () => {
        const path = 'this is a string';
        expect(() => assertIsPath(path)).not.toThrowError();
    });

    test('passes when given a Buffer', () => {
        const path = Buffer.from('this is a Buffer');
        expect(() => assertIsPath(path)).not.toThrowError();
    });

    test('passes when given a URL', () => {
        const path = new URL('https://example.com');
        expect(() => assertIsPath(path)).not.toThrowError();
    });

    test('fails when given a non-PathLike value', () => {
        const path = 17;
        expect(() => assertIsPath(path)).toThrowError(TypeError);
    });

    test('fails when given an empty string', () => {
        const path = '';
        expect(() => assertIsPath(path)).toThrowError(ValueError);
    });
});

describe('path exists assertion tests', () => {
    test('passes when given an existing file', () => {
        const tmpFile = tmp.fileSync().name;
        expect(() => assertPathExists(tmpFile)).not.toThrowError();
    });

    test('fails when given a non-existent file', () => {
        const file = path.resolve('/tmp', crypto.randomUUID());
        expect(() => assertPathExists(file)).toThrowError(FileSystemError);
    });
});
