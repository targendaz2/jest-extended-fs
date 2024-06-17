import crypto from 'node:crypto';
import path from 'node:path';
import { URL } from 'node:url';
import { describe, expect, test } from '@jest/globals';
import tmp from 'tmp';
import { ValueError } from '../../src/errors.js';
import '../../src/matchers/toExist.js';

describe('toExist matcher tests', () => {
    test('passes when given an existing file as a string', () => {
        const tmpFile = tmp.fileSync().name;
        expect(tmpFile).toExist();
    });

    test('passes when given an existing file as a Buffer', () => {
        const tmpFile = Buffer.from(tmp.fileSync().name);
        expect(tmpFile).toExist();
    });

    test('passes when given an existing file as a URL', () => {
        const tmpFile = new URL(tmp.fileSync().name, 'file://');
        expect(tmpFile).toExist();
    });

    test('fails when given a nonexistent file as a string', () => {
        const file = path.resolve('/tmp', crypto.randomUUID());
        expect(() => expect(file).toExist()).toThrowError();
    });

    test('fails when given a nonexistent file as a Buffer', () => {
        const file = Buffer.from(path.resolve('/tmp', crypto.randomUUID()));
        expect(() => expect(file).toExist()).toThrowError();
    });

    test('fails when given a nonexistent file as a URL', () => {
        const file = new URL(
            path.resolve('/tmp', crypto.randomUUID()),
            'file://',
        );
        expect(() => expect(file).toExist()).toThrowError();
    });

    test('fails when given a non-PathLike value', () => {
        const file = 17;
        expect(() => expect(file).toExist()).toThrowError(TypeError);
    });

    test('fails when given an empty value', () => {
        const file = '';
        expect(() => expect(file).toExist()).toThrowError(ValueError);
    });
});

describe('not toExist matcher tests', () => {
    test('passes when given an nonexistent file as a string', () => {
        const file = path.resolve('/tmp', crypto.randomUUID());
        expect(file).not.toExist();
    });

    test('passes when given a nonexistent file as a Buffer', () => {
        const file = Buffer.from(path.resolve('/tmp', crypto.randomUUID()));
        expect(file).not.toExist();
    });

    test('passes when given a nonexistent file as a URL', () => {
        const file = new URL(
            path.resolve('/tmp', crypto.randomUUID()),
            'file://',
        );
        expect(file).not.toExist();
    });

    test('fails when given an existing file as a string', () => {
        const tmpFile = tmp.fileSync().name;
        expect(() => expect(tmpFile).not.toExist()).toThrowError();
    });

    test('fails when given an existing file as a Buffer', () => {
        const tmpFile = Buffer.from(tmp.fileSync().name);
        expect(() => expect(tmpFile).not.toExist()).toThrowError();
    });

    test('fails when given an existing file as a URL', () => {
        const tmpFile = new URL(tmp.fileSync().name, 'file://');
        expect(() => expect(tmpFile).not.toExist()).toThrowError();
    });
});
