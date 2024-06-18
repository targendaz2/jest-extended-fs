import crypto from 'node:crypto';
import path from 'node:path';
import { describe, expect, test } from '@jest/globals';
import tmp from 'tmp';
import { FileSystemError } from '../../src/errors.js';
import '../../src/matchers/toBeADirectory.js';

describe('toBeADirectory matcher tests', () => {
    test('passes when given an existing directory', () => {
        const tmpDir = tmp.dirSync().name;
        expect(tmpDir).toBeADirectory();
    });

    test('fails when given a nonexistent directory', () => {
        const dir = path.resolve('/tmp', crypto.randomUUID());
        expect(() => expect(dir).toBeADirectory()).toThrowError(
            FileSystemError,
        );
    });

    test('fails when given an existing file', () => {
        const tmpFile = tmp.fileSync().name;
        expect(() => expect(tmpFile).toBeADirectory()).toThrowError();
    });

    test('fails when given a nonexistent file', () => {
        const file = path.resolve('/tmp', crypto.randomUUID());
        expect(() => expect(file).toBeADirectory()).toThrowError(
            FileSystemError,
        );
    });
});

describe('not toBeADirectory matcher tests', () => {
    test('passes when given an existing file', () => {
        const tmpFile = tmp.fileSync().name;
        expect(tmpFile).not.toBeADirectory();
    });

    test('fails when given a nonexistent file', () => {
        const file = path.resolve('/tmp', crypto.randomUUID());
        expect(() => expect(file).toBeADirectory()).toThrowError(
            FileSystemError,
        );
    });

    test('fails when given an existing directory', () => {
        const tmpDir = tmp.dirSync().name;
        expect(() => expect(tmpDir).not.toBeADirectory()).toThrowError();
    });

    test('fails when given a nonexistent directory', () => {
        const dir = path.resolve('/tmp', crypto.randomUUID());
        expect(() => expect(dir).not.toBeADirectory()).toThrowError(
            FileSystemError,
        );
    });
});
