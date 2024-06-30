import { beforeEach, describe, expect, test } from '@jest/globals';
import '../../src/matchers/toBeAFileContaining.js';
import { createTmpFile } from '../fixtures.js';

let tmpFile: string;

beforeEach(() => {
    tmpFile = createTmpFile({ content: 'Hello, world!' });
});

describe('toBeAFileContaining matcher tests', () => {
    test('passes when the given file contains the given text', () => {
        expect(tmpFile).toBeAFileContaining('Hello, world!');
    });

    test('fails when the given file does not contain the given text', () => {
        expect(() =>
            expect(tmpFile).toBeAFileContaining('Hello, everyone!'),
        ).toThrowError();
    });
});

describe('not toBeAFileContaining matcher tests', () => {
    test('passes when the given file does not contain the given text', () => {
        expect(tmpFile).not.toBeAFileContaining('Hello, everyone!');
    });

    test('fails when the given file contains the given text', () => {
        expect(() =>
            expect(tmpFile).not.toBeAFileContaining('Hello, world!'),
        ).toThrowError();
    });
});
