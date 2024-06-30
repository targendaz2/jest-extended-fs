import { beforeAll, describe, expect, test } from '@jest/globals';
import '../../src/matchers/toBeAnEmptyFile.js';
import { createTmpFile } from '../fixtures.js';

let tmpFileEmpty: string;
let tmpFileWithContent: string;

beforeAll(() => {
    tmpFileEmpty = createTmpFile();
    tmpFileWithContent = createTmpFile({ content: 'Hello, world!' });
});

describe('toBeAnEmptyFile matcher tests', () => {
    test('passes when the given file is empty', () => {
        expect(tmpFileEmpty).toBeAnEmptyFile();
    });

    test('fails when the given file is not empty', () => {
        expect(() =>
            expect(tmpFileWithContent).toBeAnEmptyFile(),
        ).toThrowError();
    });
});

describe('not toBeAnEmptyFile matcher tests', () => {
    test('passes when the given file is not empty', () => {
        expect(tmpFileWithContent).not.toBeAnEmptyFile();
    });

    test('fails when the given file is empty', () => {
        expect(() => expect(tmpFileEmpty).not.toBeAnEmptyFile()).toThrowError();
    });
});
