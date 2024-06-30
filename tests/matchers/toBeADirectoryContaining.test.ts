import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, test } from '@jest/globals';
import tmp from 'tmp';
import '../../src/matchers/toBeADirectoryContaining.js';

describe('toBeADirectoryContaining matcher tests', () => {
    test('passes when the given directory contains the given file', () => {
        const tmpDir = tmp.dirSync().name;
        fs.writeFileSync(path.join(tmpDir, 'file1.txt'), 'text');
        fs.writeFileSync(path.join(tmpDir, 'file2.txt'), 'text');

        expect(tmpDir).toBeADirectoryContaining('file1.txt');
    });

    test('passes when the given directory contains the given files and directories', () => {
        const tmpDir = tmp.dirSync().name;
        fs.writeFileSync(path.join(tmpDir, 'file1.txt'), 'text');
        fs.writeFileSync(path.join(tmpDir, 'file2.js'), 'text');
        fs.writeFileSync(path.join(tmpDir, 'file3.ts'), 'text');
        fs.mkdirSync(path.join(tmpDir, 'sub_dir1'));
        fs.mkdirSync(path.join(tmpDir, 'sub_dir2'));

        expect(tmpDir).toBeADirectoryContaining([
            'file1.txt',
            'file2.js',
            'sub_dir1',
        ]);
    });

    test('fails when the given directory does not contain the given file', () => {
        const tmpDir = tmp.dirSync().name;
        fs.writeFileSync(path.join(tmpDir, 'file1.txt'), 'text');
        fs.writeFileSync(path.join(tmpDir, 'file2.txt'), 'text');

        expect(() =>
            expect(tmpDir).toBeADirectoryContaining('file3.txt'),
        ).toThrowError();
    });

    test('fails when the given directory does not contain the given files and directories', () => {
        const tmpDir = tmp.dirSync().name;
        fs.writeFileSync(path.join(tmpDir, 'file1.txt'), 'text');
        fs.writeFileSync(path.join(tmpDir, 'file2.js'), 'text');
        fs.writeFileSync(path.join(tmpDir, 'file3.ts'), 'text');
        fs.mkdirSync(path.join(tmpDir, 'sub_dir1'));
        fs.mkdirSync(path.join(tmpDir, 'sub_dir2'));

        expect(() =>
            expect(tmpDir).toBeADirectoryContaining([
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
        const tmpDir = tmp.dirSync().name;
        fs.writeFileSync(path.join(tmpDir, 'file1.txt'), 'text');
        fs.writeFileSync(path.join(tmpDir, 'file2.txt'), 'text');

        expect(() =>
            expect(tmpDir).not.toBeADirectoryContaining('file1.txt'),
        ).toThrowError();
    });

    test('fails when the given directory contains the given files and directories', () => {
        const tmpDir = tmp.dirSync().name;
        fs.writeFileSync(path.join(tmpDir, 'file1.txt'), 'text');
        fs.writeFileSync(path.join(tmpDir, 'file2.js'), 'text');
        fs.writeFileSync(path.join(tmpDir, 'file3.ts'), 'text');
        fs.mkdirSync(path.join(tmpDir, 'sub_dir1'));
        fs.mkdirSync(path.join(tmpDir, 'sub_dir2'));

        expect(() =>
            expect(tmpDir).not.toBeADirectoryContaining([
                'file1.txt',
                'file2.js',
                'sub_dir1',
            ]),
        ).toThrowError();
    });

    test('passes when the given directory does not contain the given file', () => {
        const tmpDir = tmp.dirSync().name;
        fs.writeFileSync(path.join(tmpDir, 'file1.txt'), 'text');
        fs.writeFileSync(path.join(tmpDir, 'file2.txt'), 'text');

        expect(tmpDir).not.toBeADirectoryContaining('file3.txt');
    });

    test('passes when the given directory does not contain the given files and directories', () => {
        const tmpDir = tmp.dirSync().name;
        fs.writeFileSync(path.join(tmpDir, 'file1.txt'), 'text');
        fs.writeFileSync(path.join(tmpDir, 'file2.js'), 'text');
        fs.writeFileSync(path.join(tmpDir, 'file3.ts'), 'text');
        fs.mkdirSync(path.join(tmpDir, 'sub_dir1'));
        fs.mkdirSync(path.join(tmpDir, 'sub_dir2'));

        expect(tmpDir).not.toBeADirectoryContaining([
            'file1.txt',
            'file4.mp3',
            'sub_dir1',
            'sub_dir5',
        ]);
    });
});
