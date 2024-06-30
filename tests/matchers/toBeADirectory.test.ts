import { beforeAll, describe, expect, test } from '@jest/globals';
import '../../src/matchers/toBeADirectory.js';
import { createTmpDir, createTmpFile } from '../fixtures.js';

let tmpDir: string;
let tmpFile: string;

beforeAll(() => {
    tmpDir = createTmpDir();
    tmpFile = createTmpFile();
});

describe('toBeADirectory matcher tests', () => {
    test('passes when given an existing directory', () => {
        expect(tmpDir).toBeADirectory();
    });

    test('fails when given an existing file', () => {
        expect(() => expect(tmpFile).toBeADirectory()).toThrowError();
    });
});

describe('not toBeADirectory matcher tests', () => {
    test('passes when given an existing file', () => {
        expect(tmpFile).not.toBeADirectory();
    });

    test('fails when given an existing directory', () => {
        expect(() => expect(tmpDir).not.toBeADirectory()).toThrowError();
    });
});
