import { beforeAll, describe, expect, test } from '@jest/globals';
import { ValueError } from 'error-wave';
import '../../src/matchers/toHaveMode.js';
import { createTmpFile } from '../fixtures.js';

let tmpFile: string;

beforeAll(() => {
    tmpFile = createTmpFile({
        content: 'Hello, world!',
        mode: 0o766,
    });
});

describe('toHaveMode matcher tests', () => {
    test('passes when the given file has the given mode', () => {
        expect(tmpFile).toHaveMode(0o766);
    });

    test('fails when the given file does not have the given mode', () => {
        expect(() => expect(tmpFile).toHaveMode(0o777)).toThrowError();
    });

    test('fails when provided an empty value', () => {
        // @ts-expect-error 'Expression is expected to fail'
        expect(() => expect(tmpFile).toHaveMode()).toThrowError(ValueError);
    });

    test('fails when provided an invalid mode', () => {
        expect(() => expect(tmpFile).toHaveMode(0o7665)).toThrowError(
            ValueError,
        );
    });
});

describe('not toHaveMode matcher tests', () => {
    test('passes when the given file does not have the given mode', () => {
        expect(tmpFile).not.toHaveMode(0o777);
    });

    test('fails when the given file has the given mode', () => {
        expect(() => expect(tmpFile).not.toHaveMode(0o766)).toThrowError();
    });

    test('fails when provided an empty value', () => {
        // @ts-expect-error 'Expression is expected to fail'
        expect(() => expect(tmpFile).not.toHaveMode()).toThrowError(ValueError);
    });

    test('fails when provided an invalid mode', () => {
        expect(() => expect(tmpFile).not.toHaveMode(0o7665)).toThrowError(
            ValueError,
        );
    });
});
