import { beforeAll, describe, expect, test } from '@jest/globals';
import '../../src/matchers/toBeAFile.js';
import { createTmpDir, createTmpFile } from '../fixtures.js';

let tmpDir: string;
let tmpFile: string;

beforeAll(() => {
    tmpDir = createTmpDir();
    tmpFile = createTmpFile();
});

describe('toBeAFile matcher tests', () => {
    test('passes when given an existing file', () => {
        expect(tmpFile).toBeAFile();
    });

    test('fails when given an existing directory', () => {
        expect(() => expect(tmpDir).toBeAFile()).toThrowError();
    });
});

describe('not toBeAFile matcher tests', () => {
    test('passes when given an existing directory', () => {
        expect(tmpDir).not.toBeAFile();
    });

    test('fails when given an existing file', () => {
        expect(() => expect(tmpFile).not.toBeAFile()).toThrowError();
    });
});
