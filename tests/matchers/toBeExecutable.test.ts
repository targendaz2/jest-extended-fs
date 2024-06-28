import fs from 'node:fs';
import { describe, expect, test } from '@jest/globals';
import tmp from 'tmp';
import '../../src/matchers/toBeExecutable.js';

describe('toBeExecutable matcher tests', () => {
    test('passes when the given file is executable', () => {
        const tmpFile = tmp.fileSync({ postfix: '.js' }).name;
        fs.writeFileSync(tmpFile, 'console.log("Hello, world!");');
        fs.chmodSync(tmpFile, 0o766);

        expect(tmpFile).toBeExecutable();
    });

    test('fails when the given file is not executable', () => {
        const tmpFile = tmp.fileSync({ postfix: '.js' }).name;
        fs.writeFileSync(tmpFile, 'console.log("Hello, world!");');
        fs.chmodSync(tmpFile, 0o666);

        expect(() => expect(tmpFile).toBeExecutable()).toThrowError();
    });
});

describe('not toBeExecutable matcher tests', () => {
    test('passes when the given file is not executable', () => {
        const tmpFile = tmp.fileSync({ postfix: '.js' }).name;
        fs.writeFileSync(tmpFile, 'console.log("Hello, world!");');
        fs.chmodSync(tmpFile, 0o666);

        expect(tmpFile).not.toBeExecutable();
    });

    test('fails when the given file is executable', () => {
        const tmpFile = tmp.fileSync({ postfix: '.js' }).name;
        fs.writeFileSync(tmpFile, 'console.log("Hello, world!");');
        fs.chmodSync(tmpFile, 0o766);

        expect(() => expect(tmpFile).not.toBeExecutable()).toThrowError();
    });
});
