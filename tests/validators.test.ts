import { describe, expect, test } from '@jest/globals';
import { isPathLike, isUnixFileMode } from '../src/lib/validators.js';

describe('PathLike validation tests', () => {
    test('returns true when given a string', () => {
        const result = isPathLike('this is a string');
        expect(result).toBeTruthy();
    });

    test('returns true when given a Buffer', () => {
        const result = isPathLike(Buffer.from('this is a Buffer'));
        expect(result).toBeTruthy();
    });

    test('returns true when given a URL', () => {
        const result = isPathLike(new URL('https://example.com'));
        expect(result).toBeTruthy();
    });

    test('returns false when given a non-PathLike value', () => {
        const result = isPathLike(17);
        expect(result).toBeFalsy();
    });
});

describe('Unix file mode validation tests', () => {
    test('returns true when given a 3-digit octal number', () => {
        const result = isUnixFileMode(0o755);
        expect(result).toBeTruthy();
    });

    test('returns true when given a 3-digit number', () => {
        const result = isUnixFileMode(755);
        expect(result).toBeTruthy();
    });

    test('returns false when given a string', () => {
        const result = isUnixFileMode('766');
        expect(result).toBeFalsy();
    });

    test('returns false when given a boolean', () => {
        const result = isUnixFileMode(false);
        expect(result).toBeFalsy();
    });

    test('returns false when given a number with fewer than 3 digits', () => {
        const result = isUnixFileMode(22);
        expect(result).toBeFalsy();
    });

    test('returns false when given a number with greater than 3 digits', () => {
        const result = isUnixFileMode(7662);
        expect(result).toBeFalsy();
    });
});
