import { beforeEach, describe, expect, test } from '@jest/globals';
import '../../src/matchers/toBeAnEmptyDirectory.js';
import { createTmpDir } from '../fixtures.js';

let tmpDirEmpty: string;
let tmpDirWithFiles: string;

beforeEach(() => {
    tmpDirEmpty = createTmpDir();

    tmpDirWithFiles = createTmpDir({
        'file1.txt': 'text',
        'file2.js': 'text',
        'file3.ts': 'text',
        sub_dir1: null,
        sub_dir2: null,
    });
});

describe('toBeAnEmptyDirectory matcher tests', () => {
    test('passes when the given directory is empty', () => {
        expect(tmpDirEmpty).toBeAnEmptyDirectory();
    });

    test('fails when the given directory is not empty', () => {
        expect(() =>
            expect(tmpDirWithFiles).toBeAnEmptyDirectory(),
        ).toThrowError();
    });
});

describe('not toBeAnEmptyDirectory matcher tests', () => {
    test('passes when the given directory is not empty', () => {
        expect(tmpDirWithFiles).not.toBeAnEmptyDirectory();
    });

    test('fails when the given directory is empty', () => {
        expect(() =>
            expect(tmpDirEmpty).not.toBeAnEmptyDirectory(),
        ).toThrowError();
    });
});
