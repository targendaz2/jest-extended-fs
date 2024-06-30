import { beforeAll, describe, expect, test } from '@jest/globals';
import '../../src/matchers/toBeExecutable.js';
import { createTmpFile } from '../fixtures.js';

let executableTmpFile: string;
let nonExecutableTmpFile: string;

beforeAll(() => {
    executableTmpFile = createTmpFile({
        content: 'console.log("Hello, world!");',
        mode: 0o766,
    });

    nonExecutableTmpFile = createTmpFile({
        content: 'console.log("Hello, world!");',
        mode: 0o666,
    });
});

describe('toBeExecutable matcher tests', () => {
    test('passes when the given file is executable', () => {
        expect(executableTmpFile).toBeExecutable();
    });

    test('fails when the given file is not executable', () => {
        expect(() =>
            expect(nonExecutableTmpFile).toBeExecutable(),
        ).toThrowError();
    });
});

describe('not toBeExecutable matcher tests', () => {
    test('passes when the given file is not executable', () => {
        expect(nonExecutableTmpFile).not.toBeExecutable();
    });

    test('fails when the given file is executable', () => {
        expect(() =>
            expect(executableTmpFile).not.toBeExecutable(),
        ).toThrowError();
    });
});
