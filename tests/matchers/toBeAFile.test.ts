import crypto from 'node:crypto';
import path from 'node:path';
import { describe, expect, test } from '@jest/globals';
import tmp from 'tmp';
import { FileSystemError } from '../../src/errors.js';
import '../../src/matchers/toBeAFile.js';

describe('toBeAFile matcher tests', () => {
    test('passes when given an existing file', () => {
        const tmpFile = tmp.fileSync().name;
        expect(tmpFile).toBeAFile();
    });

    test('fails when given a nonexistent file', () => {
        const file = path.resolve('/tmp', crypto.randomUUID());
        expect(() => expect(file).toBeAFile()).toThrowError(FileSystemError);
    });

    test('fails when given an existing directory', () => {
        const tmpDir = tmp.dirSync().name;
        expect(() => expect(tmpDir).toBeAFile()).toThrowError();
    });

    test('fails when given a nonexistent directory', () => {
        const dir = path.resolve('/tmp', crypto.randomUUID());
        expect(() => expect(dir).toBeAFile()).toThrowError(FileSystemError);
    });
});

describe('not toBeAFile matcher tests', () => {
    test('passes when given an existing directory', () => {
        const tmpDir = tmp.dirSync().name;
        expect(tmpDir).not.toBeAFile();
    });

    test('fails when given a nonexistent directory', () => {
        const dir = path.resolve('/tmp', crypto.randomUUID());
        expect(() => expect(dir).not.toBeAFile()).toThrowError(FileSystemError);
    });

    test('fails when given an existing file', () => {
        const tmpFile = tmp.fileSync().name;
        expect(() => expect(tmpFile).not.toBeAFile()).toThrowError();
    });

    test('fails when given a nonexistent file', () => {
        const file = path.resolve('/tmp', crypto.randomUUID());
        expect(() => expect(file).toBeAFile()).toThrowError(FileSystemError);
    });
});
