import crypto from 'node:crypto';
import path from 'node:path';
import { describe, expect, test } from '@jest/globals';
import tmp from 'tmp';
import '../../src/matchers/toExist.js';

describe('toExist matcher tests', () => {
    test('passes when given an existing file', () => {
        const tmpFile = tmp.fileSync().name;
        expect(tmpFile).toExist();
    });

    test('fails when given a nonexistent file', () => {
        const file = path.resolve('/tmp', crypto.randomUUID());
        expect(() => expect(file).toExist()).toThrowError();
    });
});

describe('not toExist matcher tests', () => {
    test('passes when given an nonexistent file', () => {
        const file = path.resolve('/tmp', crypto.randomUUID());
        expect(file).not.toExist();
    });

    test('fails when given an existing file', () => {
        const tmpFile = tmp.fileSync().name;
        expect(() => expect(tmpFile).not.toExist()).toThrowError();
    });
});
