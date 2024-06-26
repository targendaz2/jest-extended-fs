import fs from 'node:fs';
import { describe, expect, test } from '@jest/globals';
import tmp from 'tmp';
// import { FileSystemError, ValueError } from '../../src/errors.js';
import '../../src/matchers/toHaveMode.js';

describe('toHaveMode matcher tests', () => {
    test('passes when the given file has the given mode', () => {
        const tmpFile = tmp.fileSync({ postfix: '.txt' }).name;
        fs.writeFileSync(tmpFile, 'Hello, world!');
        fs.chmodSync(tmpFile, 0o766);

        expect(tmpFile).toHaveMode(0o766);
    });

    test('fails when the given file does not have the given mode', () => {
        const tmpFile = tmp.fileSync({ postfix: '.txt' }).name;
        fs.writeFileSync(tmpFile, 'Hello, world!');
        fs.chmodSync(tmpFile, 0o766);

        expect(() => expect(tmpFile).toHaveMode(0o777)).toThrowError();
    });

    // test('fails when provided an empty string', () => {
    //     const tmpFile = tmp.fileSync().name;
    //     fs.writeFileSync(tmpFile, 'Hello, world!');
    //     expect(() => expect(tmpFile).toHaveMode('')).toThrowError(ValueError);
    // });

    // test('fails when provided a directory', () => {
    //     const tmpDir = tmp.dirSync().name;
    //     expect(() => expect(tmpDir).toHaveMode('Hello, world!')).toThrowError(
    //         FileSystemError,
    //     );
    // });
});

// describe('not toHaveMode matcher tests', () => {
//     test('passes when the given file does not contain the given text', () => {
//         const tmpFile = tmp.fileSync().name;
//         fs.writeFileSync(tmpFile, 'Hello, world!');
//         expect(tmpFile).not.toHaveMode('Hello, everyone!');
//     });

//     test('fails when the given file contains the given text', () => {
//         const tmpFile = tmp.fileSync().name;
//         fs.writeFileSync(tmpFile, 'Hello, world!');
//         expect(() =>
//             expect(tmpFile).not.toHaveMode('Hello, world!'),
//         ).toThrowError();
//     });

//     test('fails when provided an empty string', () => {
//         const tmpFile = tmp.fileSync().name;
//         fs.writeFileSync(tmpFile, 'Hello, world!');
//         expect(() => expect(tmpFile).not.toHaveMode('')).toThrowError(
//             ValueError,
//         );
//     });

//     test('fails when provided a directory', () => {
//         const tmpDir = tmp.dirSync().name;
//         expect(() =>
//             expect(tmpDir).not.toHaveMode('Hello, world!'),
//         ).toThrowError(FileSystemError);
//     });
// });
