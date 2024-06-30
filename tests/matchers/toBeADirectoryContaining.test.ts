import { beforeAll, describe, expect, test } from '@jest/globals';
import '../../src/matchers/toBeADirectoryContaining.js';
import { createTmpDir } from '../fixtures.js';

let tmpDirWithFiles: string;
let tmpDirWithFilesAndDirs: string;

beforeAll(() => {
    tmpDirWithFiles = createTmpDir({
        'file1.txt': 'text',
        'file2.txt': 'text',
    });

    tmpDirWithFilesAndDirs = createTmpDir({
        'file1.txt': 'text',
        'file2.js': 'text',
        'file3.ts': 'text',
        sub_dir1: null,
        sub_dir2: null,
    });
});

describe('toBeADirectoryContaining matcher tests', () => {
    test('passes when the given directory contains the given file', () => {
        expect(tmpDirWithFiles).toBeADirectoryContaining('file1.txt');
    });

    test('passes when the given directory contains the given files and directories', () => {
        expect(tmpDirWithFilesAndDirs).toBeADirectoryContaining([
            'file1.txt',
            'file2.js',
            'sub_dir1',
        ]);
    });

    test('fails when the given directory does not contain the given file', () => {
        expect(() =>
            expect(tmpDirWithFiles).toBeADirectoryContaining('file3.txt'),
        ).toThrowError();
    });

    test('fails when the given directory does not contain the given files and directories', () => {
        expect(() =>
            expect(tmpDirWithFilesAndDirs).toBeADirectoryContaining([
                'file1.txt',
                'file4.mp3',
                'sub_dir1',
                'sub_dir5',
            ]),
        ).toThrowError();
    });
});

describe('not toBeADirectoryContaining matcher tests', () => {
    test('fails when the given directory contains the given file', () => {
        expect(() =>
            expect(tmpDirWithFiles).not.toBeADirectoryContaining('file1.txt'),
        ).toThrowError();
    });

    test('fails when the given directory contains the given files and directories', () => {
        expect(() =>
            expect(tmpDirWithFilesAndDirs).not.toBeADirectoryContaining([
                'file1.txt',
                'file2.js',
                'sub_dir1',
            ]),
        ).toThrowError();
    });

    test('passes when the given directory does not contain the given file', () => {
        expect(tmpDirWithFiles).not.toBeADirectoryContaining('file3.txt');
    });

    test('passes when the given directory does not contain the given files and directories', () => {
        expect(tmpDirWithFilesAndDirs).not.toBeADirectoryContaining([
            'file1.txt',
            'file4.mp3',
            'sub_dir1',
            'sub_dir5',
        ]);
    });
});
