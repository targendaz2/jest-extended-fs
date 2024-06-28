import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, test } from '@jest/globals';
import tmp from 'tmp';
import '../../src/matchers/toBeAnEmptyDirectory.js';

describe('toBeAnEmptyDirectory matcher tests', () => {
    test('passes when the given directory is empty', () => {
        const tmpDir = tmp.dirSync().name;

        expect(tmpDir).toBeAnEmptyDirectory();
    });

    test('fails when the given directory is not empty', () => {
        const tmpDir = tmp.dirSync().name;
        fs.writeFileSync(path.join(tmpDir, 'file1.txt'), 'text');
        fs.writeFileSync(path.join(tmpDir, 'file2.js'), 'text');
        fs.writeFileSync(path.join(tmpDir, 'file3.ts'), 'text');
        fs.mkdirSync(path.join(tmpDir, 'sub_dir1'));
        fs.mkdirSync(path.join(tmpDir, 'sub_dir2'));

        expect(() => expect(tmpDir).toBeAnEmptyDirectory()).toThrowError();
    });
});

describe('not toBeAnEmptyDirectory matcher tests', () => {
    test('passes when the given directory is not empty', () => {
        const tmpDir = tmp.dirSync().name;
        fs.writeFileSync(path.join(tmpDir, 'file1.txt'), 'text');
        fs.writeFileSync(path.join(tmpDir, 'file2.js'), 'text');
        fs.writeFileSync(path.join(tmpDir, 'file3.ts'), 'text');
        fs.mkdirSync(path.join(tmpDir, 'sub_dir1'));
        fs.mkdirSync(path.join(tmpDir, 'sub_dir2'));

        expect(tmpDir).not.toBeAnEmptyDirectory();
    });

    test('fails when the given directory is empty', () => {
        const tmpDir = tmp.dirSync().name;

        expect(() => expect(tmpDir).not.toBeAnEmptyDirectory()).toThrowError();
    });
});
