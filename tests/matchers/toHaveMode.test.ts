import fs from 'node:fs';
import { describe, expect, test } from '@jest/globals';
import tmp from 'tmp';
import { ValueError } from '../../src/errors.js';
import '../../src/matchers/toHaveMode.js';

describe('toHaveMode matcher tests', () => {
    test('passes when the given file has the given mode', () => {
        const tmpFile = tmp.fileSync({ postfix: '.txt' }).name;
        fs.writeFileSync(tmpFile, 'Hello, world!');
        fs.chmodSync(tmpFile, 0o766);

        expect(tmpFile).toHaveMode(0o767);
    });

    test('fails when the given file does not have the given mode', () => {
        const tmpFile = tmp.fileSync({ postfix: '.txt' }).name;
        fs.writeFileSync(tmpFile, 'Hello, world!');
        fs.chmodSync(tmpFile, 0o766);

        expect(() => expect(tmpFile).toHaveMode(0o777)).toThrowError();
    });

    test('fails when provided an empty value', () => {
        const tmpFile = tmp.fileSync({ postfix: '.txt' }).name;
        fs.writeFileSync(tmpFile, 'Hello, world!');
        fs.chmodSync(tmpFile, 0o766);

        // @ts-expect-error 'Expression is expected to fail'
        expect(() => expect(tmpFile).toHaveMode()).toThrowError(ValueError);
    });

    test('fails when provided an invalid mode', () => {
        const tmpFile = tmp.fileSync({ postfix: '.txt' }).name;
        fs.writeFileSync(tmpFile, 'Hello, world!');
        fs.chmodSync(tmpFile, 0o766);

        expect(() => expect(tmpFile).toHaveMode(0o7665)).toThrowError(
            ValueError,
        );
    });
});

describe('not toHaveMode matcher tests', () => {
    test('passes when the given file does not have the given mode', () => {
        const tmpFile = tmp.fileSync({ postfix: '.txt' }).name;
        fs.writeFileSync(tmpFile, 'Hello, world!');
        fs.chmodSync(tmpFile, 0o766);

        expect(tmpFile).not.toHaveMode(0o777);
    });

    test('fails when the given file has the given mode', () => {
        const tmpFile = tmp.fileSync({ postfix: '.txt' }).name;
        fs.writeFileSync(tmpFile, 'Hello, world!');
        fs.chmodSync(tmpFile, 0o766);

        expect(() => expect(tmpFile).not.toHaveMode(0o766)).toThrowError();
    });

    test('fails when provided an empty value', () => {
        const tmpFile = tmp.fileSync({ postfix: '.txt' }).name;
        fs.writeFileSync(tmpFile, 'Hello, world!');
        fs.chmodSync(tmpFile, 0o766);

        // @ts-expect-error 'Expression is expected to fail'
        expect(() => expect(tmpFile).not.toHaveMode()).toThrowError(ValueError);
    });

    test('fails when provided an invalid mode', () => {
        const tmpFile = tmp.fileSync({ postfix: '.txt' }).name;
        fs.writeFileSync(tmpFile, 'Hello, world!');
        fs.chmodSync(tmpFile, 0o766);

        expect(() => expect(tmpFile).not.toHaveMode(0o7665)).toThrowError(
            ValueError,
        );
    });
});
