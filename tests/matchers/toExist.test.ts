import crypto from 'node:crypto';
import path from 'node:path';
import { beforeAll, describe, expect, test } from '@jest/globals';
import '../../src/matchers/toExist.js';
import { createTmpDir, createTmpFile } from '../fixtures.js';

let existingTmpDir: string;
let nonexistentTmpDir: string;
let existingTmpFile: string;
let nonexistentTmpFile: string;

beforeAll(() => {
    existingTmpDir = createTmpDir();
    existingTmpFile = createTmpFile();
    nonexistentTmpDir = path.resolve('/tmp', crypto.randomUUID());
    nonexistentTmpFile = path.resolve('/tmp', crypto.randomUUID() + '.txt');
});

describe('toExist matcher tests', () => {
    test('passes when given an existing directory', () => {
        expect(existingTmpDir).toExist();
    });

    test('passes when given an existing file', () => {
        expect(existingTmpFile).toExist();
    });

    test('fails when given a nonexistent directory', () => {
        expect(() => expect(nonexistentTmpDir).toExist()).toThrowError();
    });

    test('fails when given a nonexistent file', () => {
        expect(() => expect(nonexistentTmpFile).toExist()).toThrowError();
    });
});

describe('not toExist matcher tests', () => {
    test('passes when given an nonexistent directory', () => {
        expect(nonexistentTmpDir).not.toExist();
    });

    test('passes when given an nonexistent file', () => {
        expect(nonexistentTmpFile).not.toExist();
    });

    test('fails when given an existing directory', () => {
        expect(() => expect(existingTmpDir).not.toExist()).toThrowError();
    });

    test('fails when given an existing file', () => {
        expect(() => expect(existingTmpFile).not.toExist()).toThrowError();
    });
});
